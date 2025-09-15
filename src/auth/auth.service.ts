import { Injectable,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/admin/schema/employee-schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AuthService {

    constructor(
    private jwtService: JwtService,
    @InjectModel(Employee.name) private empModel: Model<Employee>,) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.empModel.findOne({ email }).exec();
        if (!user) throw new UnauthorizedException('Invalid credential');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credential');

        return user;
        }



    async login(user: any) {
        const payload = { sub: user._id, email: user.email, role: user.roleId };
        return {
        access_token: this.jwtService.sign(payload),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.roleId,
        },
        };
    }
}







