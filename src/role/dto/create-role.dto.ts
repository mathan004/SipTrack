import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateRoleDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty()
    status: Boolean;
}