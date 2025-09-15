import { Body, Controller, Post, Get, Patch, Delete, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateEmpDto } from './dto/create-emp.dto';
import { UpdateEmpDto } from './dto/update-emp.dto';

@Controller('/api/user')
export class AdminController {


    constructor(private readonly adminService: AdminService) { }
    @Post()
    create(@Body() createEmpDto: CreateEmpDto) {

        return this.adminService.create(createEmpDto);
    }


    @Get(':id')
    find(@Param('id') id: string) {
        return this.adminService.find(id);
    }


    @Get()
    findByDateRange(@Query('fromDate') fromDate: string, @Query('toDate') toDate: string, @Res() res: Response) {
        return this.adminService.findByDateRange(fromDate, toDate,res);
    }




    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEmpDto: UpdateEmpDto) {
        return this.adminService.update(id, updateEmpDto);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.adminService.remove(id);
    }


}
