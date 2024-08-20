import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseInterceptors, Query, UploadedFile, UseGuards, Put, ValidationPipe, UsePipes } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { Response } from 'express';
import { FilterViTriDto } from './dto/filter-vi-tri.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FileInterceptorClass } from 'src/model/file.image';
import path from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
class uploadTypeDto{
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}
@ApiBearerAuth()
@ApiTags("Vị Trí")
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  
  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createViTriDto: CreateViTriDto,
) {
    return this.viTriService.create(createViTriDto);
  }

  
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get()
  async findAll() {
  
    return this.viTriService.findAll();
  }

  @ApiQuery({name:'pageIndex'})
  @ApiQuery({name:'pageSize'})
  @ApiQuery({
    name: 'search',
    required: false,  // Đặt required là false để không yêu cầu tham số này
    type: String,     // Xác định loại của tham số này (số trong trường hợp này)
  })
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get('/phan-trang-tim-kiem')
  findAllPage(@Query() query:FilterViTriDto){
    return this.viTriService.findAllPageSearch(query)
  }


  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viTriService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Put(':id')
  update(@Param('id') id: string, 
  @Body() updateViTriDto: CreateViTriDto,

) {
    return this.viTriService.update(+id,updateViTriDto);
  }

 
  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Delete(':id')
  remove(@Param('id') id: string) {
 

    return this.viTriService.remove(+id);
  }
  
  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type:uploadTypeDto 
  })
  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  
  @Put('upload/:id')
  updateImage(@Param('id') id: string, 
  @Body() updateViTriDto: UpdateViTriDto,
  @UploadedFile() file: Express.Multer.File

) {
    return this.viTriService.update(+id, {...updateViTriDto,hinh_anh:file.filename});
  }

 
}
