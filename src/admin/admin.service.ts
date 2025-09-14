import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Employee } from './schema/employee-schema';
import { CreateEmpDto } from './dto/create-emp.dto';
import { Role } from '../role/schema/role-schema';
import { UpdateEmpDto } from './dto/update-emp.dto';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Employee.name) private userModel: Model<Employee>,
        @InjectModel(Role.name) private roleModel: Model<Role>
    ) { }

    async create(createEmpDto: CreateEmpDto): Promise<Employee> {

        const newEmployee = await this.userModel.findOne({ email: createEmpDto.email }).exec();
        if (newEmployee) {
            throw new BadRequestException('Employee already exists');
        }


        const role = await this.roleModel.findById(createEmpDto.roleId).exec();
        if (!role) {
            throw new BadRequestException('Invalid role ID');
        }

        const createdEmployee = new this.userModel(createEmpDto);

        return createdEmployee.save();
    }



    async find(id: string): Promise<Employee> {
        const employee = await this.userModel.findById(id).exec();
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        return employee;
    }



    async update(id: string, UpdateEmpDto: UpdateEmpDto): Promise<Employee> {


        const updatedEmployee = await this.userModel.findByIdAndUpdate(id, UpdateEmpDto, { new: true }).exec();
        if (!updatedEmployee) {
            throw new NotFoundException('Employee not found after update');
        }

        return updatedEmployee;
    }


    async remove(id: string): Promise<{ message: string }> {
        const deletedEmployee = await this.userModel.findByIdAndDelete(id).exec();
        if (!deletedEmployee) {
            throw new NotFoundException('Employee not found for deletion');
        }
        return { message: 'Employee successfully deleted' };
    }


}
