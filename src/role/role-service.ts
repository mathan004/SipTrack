
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Role } from './schema/role-schema';
import { CreateRoleDto } from './dto/create-role.dto';




@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private userModel: Model<Role>,

  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {

    const newRole = await this.userModel.findOne({ name: createRoleDto.name }).exec();
    if (newRole) {
      throw new BadRequestException('Role already exists');
    }
    const createdRole = new this.userModel(createRoleDto);
    return createdRole.save();
  }



  async remove(id: string): Promise<Role> {

    const existingRole = await this.userModel.findById(id).exec();
    if (!existingRole) {
      throw new Error('Role not found');
    }

    const deletedRole = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedRole) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return deletedRole;



  }

}
