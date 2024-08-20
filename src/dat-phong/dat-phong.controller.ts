import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth()
@ApiTags("Đặt phòng")
@Controller('dat-phong')


export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại ! hoặc Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post()
  create(@Body() createDatPhongDto: CreateDatPhongDto) {
    return this.datPhongService.create(createDatPhongDto);
  }


  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get()
  findAll() {
    return this.datPhongService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Mã đặt phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datPhongService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get('lay-dat-phong-theo-ma-nguoi-dung/:idUser')
  findBookRoomToUser(@Param('idUser') idUser: string) {
    return this.datPhongService.findBookRoomToUser(+idUser);
  }
  
  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiQuery({
    name: 'search',
    required: false,  // Đặt required là false để không yêu cầu tham số này
    type: String,     // Xác định loại của tham số này (số trong trường hợp này)
  })
  @ApiQuery({name:'pageSize'})
  @ApiQuery({name:'pageIndex'})
  @Get('lay-dat-phong-theo-ma-nguoi-dung-phan-trang-tim-kiem/:idUser')
  findBookRoomToUserPageSearch(@Query() query:any,@Param('idUser') idUser: string){
    return this.datPhongService.findBookRoomToUserPageSearch(+idUser,query)
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Mã đặt phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDatPhongDto: UpdateDatPhongDto) {
    return this.datPhongService.update(+id, updateDatPhongDto);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Mã đặt phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datPhongService.remove(+id);
  }
}
