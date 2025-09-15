import { RoleService } from './role-service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Post, Delete, Body,Controller} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/auth.service';
import { Roles } from 'src/auth/auth.service';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('/api/role')
export class RoleController {

    constructor(private readonly roleService: RoleService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {

        return this.roleService.create(createRoleDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    
    @Delete(':id')
    remove(@Body('id') id: string) {
        return this.roleService.remove(id);
    }





}
