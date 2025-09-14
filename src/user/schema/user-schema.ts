import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document,Types } from 'mongoose';
import {Employee} from 'src/admin/schema/employee-schema';




export enum Session {
  MORNING = 'morning',
  EVENING = 'evening',
}

@Schema( { timestamps: true })
export class User extends Document {

    @Prop({ type: Types.ObjectId, ref: Employee.name, required: true })
    user_id:Employee | Types.ObjectId;
    @Prop({ required: true })
    date: Date;
    @Prop({ required: true })
    session: Session;
    @Prop({ required: true })
    quantity: number;
    @Prop({ required: true })
    totalPrice: number; 
}


export const UserSchema = SchemaFactory.createForClass(User);
    

   