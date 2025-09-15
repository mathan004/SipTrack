import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { Employee } from './schema/employee-schema';
import { CreateEmpDto } from './dto/create-emp.dto';
import { Role } from '../role/schema/role-schema';
import { UpdateEmpDto } from './dto/update-emp.dto';
import * as ExcelJS from 'exceljs';
import { User, UserSchema } from 'src/user/schema/user-schema';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Employee.name) private empModel: Model<Employee>,
        @InjectModel(Role.name) private roleModel: Model<Role>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(createEmpDto: CreateEmpDto): Promise<Employee> {

        const newEmployee = await this.empModel.findOne({ email: createEmpDto.email }).exec();
        if (newEmployee) {
            throw new BadRequestException('Employee already exists');
        }

        const role = await this.roleModel.findById(createEmpDto.roleId).exec();
        if (!role) {
            throw new BadRequestException('Invalid role ID');

        }

        const salt = await bcrypt.genSalt();
        const hashedpassword=await bcrypt.hash(createEmpDto.password, salt);

        const createdEmployee = new this.empModel({
            ...createEmpDto,
            password: hashedpassword
        });
        return createdEmployee.save();
    }



    async find(id: string): Promise<Employee> {
        const employee = await this.empModel.findById(id).exec();
        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        return employee;
    }



    async findByDateRange(fromDate: string, toDate: string, res: Response): Promise<void> {
        const from = new Date(fromDate);
        const to = new Date(toDate);


        const users = await this.userModel.find({
            date: { $gte: from, $lte: to },
        })
            .populate('user_id', 'name') // if you linked employee
            .exec();

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Users');

        // Add header row
        sheet.addRow(['Name', 'Date', 'Session', 'Quantity', 'Total Price']);

        let totalQuantity = 0;
        let totalAmount = 0;

        // Add user rows
        users.forEach((u) => {
            const dateStr = u.date.toISOString().split('T')[0];

            sheet.addRow([
                (u as any).user_id?.name,
                dateStr,
                u.session,
                u.quantity,
                u.totalPrice,
            ]);

            totalQuantity += u.get('quantity');
            totalAmount += u.get('totalPrice');
        });

        // Add empty row for spacing
        sheet.addRow([]);

        // Add summary row
        sheet.addRow(['TOTAL', '', '', totalQuantity, totalAmount]);

        // Excel response headers
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=users.xlsx',
        );

        await workbook.xlsx.write(res);
        res.end();
    }







    async update(id: string, UpdateEmpDto: UpdateEmpDto): Promise<Employee> {


        const updatedEmployee = await this.empModel.findByIdAndUpdate(id, UpdateEmpDto, { new: true }).exec();
        if (!updatedEmployee) {
            throw new NotFoundException('Employee not found after update');
        }

        return updatedEmployee;
    }


    async remove(id: string): Promise<{ message: string }> {
        const deletedEmployee = await this.empModel.findByIdAndDelete(id).exec();
        if (!deletedEmployee) {
            throw new NotFoundException('Employee not found for deletion');
        }
        return { message: 'Employee successfully deleted' };
    }


}
