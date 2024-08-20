import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { YeuThichService } from './yeu-thich.service';
import { CreateYeuThichDto } from './dto/create-yeu-thich.dto';
import { UpdateYeuThichDto } from './dto/update-yeu-thich.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { responseSend } from 'src/model/response';
import { PrismaClient } from '@prisma/client';
import { PageFilter } from 'src/model/page.type';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags("Phòng Yêu Thích")
@Controller('yeu-thich')
export class YeuThichController {
  constructor(private readonly yeuThichService: YeuThichService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại hoặc Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post()
 create(@Body() createYeuThichDto: CreateYeuThichDto) {
  return this.yeuThichService.create(createYeuThichDto);

  }


  @UseGuards(AuthGuard)
  @ApiQuery({name:'pageSize'})
  @ApiQuery({name:'pageIndex'})
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Mã phòng yêu thích không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get('lay-san-pham-yeu-thich-theo-nguoi-dung/:idUser')
  findOne(@Param('idUser') idUser: string,@Query() query:any) {
    return this.yeuThichService.findAllByIdUserPage(+idUser,query);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại ! hoặc Phải lớn hơn 0 !"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.yeuThichService.remove(+id);
  }
}
