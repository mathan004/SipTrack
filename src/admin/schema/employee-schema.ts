
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/role/schema/role-schema';





@Schema( { timestamps: true })

export class Employee extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop()
    phone?: string;
    @Prop({ type: Types.ObjectId, ref: Role.name, required: true })
    roleId: Role | Types.ObjectId;
}


export const EmployeeSchema = SchemaFactory.createForClass(Employee);
