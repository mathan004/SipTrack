import { RoleService } from './role-service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Post, Delete, Body,Controller} from '@nestjs/common';


@Controller('/api/role')
export class RoleController {

    constructor(private readonly roleService: RoleService) { }


    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {

        return this.roleService.create(createRoleDto);
    }


    @Delete(':id')
    remove(@Body('id') id: string) {
        return this.roleService.remove(id);
    }





}
