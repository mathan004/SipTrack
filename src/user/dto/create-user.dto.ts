import { IsEmail, IsNotEmpty, MinLength ,IsEnum} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Session } from  '../schema/user-schema';



export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    user_id:string;

    @ApiProperty()
    @IsNotEmpty()
    date: Date;
    @ApiProperty({ enum: Session, description: 'Session type (morning/evening)' })
    @IsNotEmpty()
    @IsEnum(Session)
    session: Session;
    @ApiProperty()
    @IsNotEmpty()
    quantity: number;
    @ApiProperty()
    @IsNotEmpty() 
    totalPrice: number; 
}
  