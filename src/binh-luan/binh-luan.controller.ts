import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags("Bình luận")
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại ! hoặc Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post()
  create(@Body() createBinhLuanDto: CreateBinhLuanDto) {
    
    return this.binhLuanService.create(createBinhLuanDto);
  }

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get()
  findAll() {
    return this.binhLuanService.findAll();
  }

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get('phong/:id')
  findCommentRoom(@Param('id') id: string) {
    return this.binhLuanService.findCommentRoom(+id);
  }

  // phân trang comment room
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiQuery({name:'pageSize'})
  @ApiQuery({name:'pageIndex'})
  @Get('phan-trang-phong-comment/:id')
  findCommentRoomPage(@Query() query:any,@Param('id') id: string){
    return this.binhLuanService.findCommentRoomPage(+id,query)
  }

  // Tìm theo bình luận của user 
  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get('user/:id')
  firstCommentUser(@Param('id') id: string) {
    return this.binhLuanService.findCommentUser(+id);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiQuery({name:'pageSize'})
  @ApiQuery({name:'pageIndex'})
  @Get('phan-trang-nguoi-dung-binh-luan/:id')
  findCommentUserPage(@Query() query:any,@Param('id') id: string){
    return this.binhLuanService.findCommentUserPage(+id,query)
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Bình luận không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBinhLuanDto: UpdateBinhLuanDto) {
    return this.binhLuanService.update(+id, updateBinhLuanDto);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Bình luận không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binhLuanService.remove(+id);
  }
}
