import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Employee,EmployeeSchema } from './schema/employee-schema';
import { Role,RoleSchema } from '../role/schema/role-schema';
import { User,UserSchema } from 'src/user/schema/user-schema';

@Module({
  imports: [
      MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema},
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema }

        
      ]),
  
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
