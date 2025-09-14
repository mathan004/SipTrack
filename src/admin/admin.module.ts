import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Employee,EmployeeSchema } from './schema/employee-schema';
import { Role,RoleSchema } from '../role/schema/role-schema';

@Module({
  imports: [
      MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema},
      { name: Role.name, schema: RoleSchema }
        
      ]),
  
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
