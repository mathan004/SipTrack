import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Employee, EmployeeSchema } from 'src/admin/schema/employee-schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Role, RoleSchema } from 'src/role/schema/role-schema';
import { JwtStrategy } from './auth.service'

@Module({
imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // 👈 register jwt
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mySuperSecretKey',
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([
      {name: Employee.name, schema: EmployeeSchema},
      {name: Role.name, schema: RoleSchema}]),
  ],

  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }