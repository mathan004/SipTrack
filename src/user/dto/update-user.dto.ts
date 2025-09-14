
import { IsEmail, IsNotEmpty, MinLength ,IsEnum} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Session } from  '../schema/user-schema';


export class UpdateUserDto {

    
    @ApiProperty()
    @IsNotEmpty()
    user_id:string;
    @ApiProperty()
    date?: Date;
    @ApiProperty({ enum: Session, description: 'Session type (morning/evening)' })
    @IsEnum(Session)
    session?: Session;
    @ApiProperty()
    quantity?: number;
    @ApiProperty() 
    totalPrice?: number; 
}
