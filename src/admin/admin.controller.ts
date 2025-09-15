import { Body, Controller, Post, Get, Patch, Delete, Param, Query, Res,UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateEmpDto } from './dto/create-emp.dto';
import { UpdateEmpDto } from './dto/update-emp.dto';
import { JwtAuthGuard } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/auth.service';
import { Roles } from 'src/auth/auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class AdminController {


    constructor(private readonly adminService: AdminService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')

    @Post()
    create(@Body() createEmpDto: CreateEmpDto) {

        return this.adminService.create(createEmpDto);
    }
    

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')

    @Get(':id')
    find(@Param('id') id: string) {
        return this.adminService.find(id);
    }
    

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')

    @Get()
    findByDateRange(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string, @Res() res: Response) {
        return this.adminService.findByDateRange(fromDate, toDate,res);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmpDto: UpdateEmpDto) {
        return this.adminService.update(id, updateEmpDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adminService.remove(id);
    }


}
