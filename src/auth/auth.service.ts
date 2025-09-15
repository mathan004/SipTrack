import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Employee } from 'src/admin/schema/employee-schema';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/role/schema/role-schema';
import { SetMetadata } from '@nestjs/common';
import { Injectable, CanActivate, ExecutionContext,UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PassportStrategy } from '@nestjs/passport';
@Injectable()
export class AuthService {

    constructor(
    private jwtService: JwtService,
    @InjectModel(Employee.name) private empModel: Model<Employee>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.empModel.findOne({ email }).exec();
        if (!user) throw new UnauthorizedException('Invalid credential');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credential');

        return user;
        }



    async login(user: any) {
        const role = await this.roleModel.findById(user.roleId)
        const payload = { sub: user._id, email: user.email, role: role?.name || 'unknown' };
        return {
        access_token: this.jwtService.sign(payload),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: role?.name || 'unknown',
        },

        
        };

    }



    async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
        const user = await this.empModel.findById(userId).exec();
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Current password is incorrect');
        }
        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedNewPassword;
        await user.save();
    }



}

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);





@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!requiredRoles) {
      return true; // if no @Roles decorator, allow access
    }

    const { user } = context.switchToHttp().getRequest();

 
    return requiredRoles.includes(user.role); 
  }
}



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'mySuperSecretKey',
    });
  }

  async validate(payload: any) {
    // attaches to req.user
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}











