import { IsEmail, IsNotEmpty, MinLength, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateEmpDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @MinLength(6)
    password: string;
    @ApiProperty()
    phone?: string;
    @ApiProperty()
    @IsMongoId()
    roleId: string;
}
