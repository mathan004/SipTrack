import { Controller, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { Post, Get, Body, Param, Delete, Patch ,Req,ValidationPipe} from '@nestjs/common';
import { CreateUserDto,ChangePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/auth.service';
import { Roles } from 'src/auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';



@Controller('api/user')
export class UserController {

    constructor(private readonly userService: UserService,
                private readonly authService: AuthService,) { }
  


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('employee')
    // @UsePipes(new ValidationPipe())


    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('employee')

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('employee')
    
    @Post('change-password')
    async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
           await this.authService.changePassword( 
            req.user.userId,
            dto.oldPassword,
            dto.newPassword,);
            
            return { message: 'Password changed successfully' };
}



}
