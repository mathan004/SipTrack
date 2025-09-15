import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role-module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    RoleModule,
    AdminModule,
    UserModule,
    AuthModule


  ],

})



export class AppModule {}
