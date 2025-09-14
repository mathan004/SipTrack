import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user-schema';
import { Employee,EmployeeSchema } from 'src/admin/schema/employee-schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, 
                                {name: Employee.name, schema: EmployeeSchema} ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
