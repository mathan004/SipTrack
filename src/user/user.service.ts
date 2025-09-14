import { Injectable,BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user-schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Employee } from 'src/admin/schema/employee-schema';


@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Employee.name) private employeeModel: Model<Employee>
        

    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const price = 6
        const totalPrice = price * createUserDto.quantity;

        const Employee = await this.employeeModel.findById(createUserDto.user_id).exec();
        if (!Employee) {
            throw new BadRequestException('Invalid role ID');
        }
        


        const createdUser = new this.userModel({
            ...createUserDto,
            totalPrice: totalPrice,
        });

        return createdUser.save()
    }


    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {


        const Employee = await this.employeeModel.findById(updateUserDto.user_id).exec();
        if (!Employee) {
            throw new BadRequestException('Invalid role ID');
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
        if (!updatedUser) {
            throw new Error('User not found after update');
        }

        return updatedUser;

    }




}
