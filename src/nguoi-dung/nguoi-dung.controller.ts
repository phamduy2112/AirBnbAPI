import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Put, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto, createPasswordDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { FileInterceptorClass } from 'src/model/file.image';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

class uploadTypeDto{
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}

@ApiBearerAuth()
@ApiTags("Người dùng")
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(private readonly nguoiDungService: NguoiDungService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post()
  create(@Body() createNguoiDungDto: CreateNguoiDungDto) {
    return this.nguoiDungService.create(createNguoiDungDto);
  }
  
  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get()
  findAll() {
    return this.nguoiDungService.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiQuery({name:'pageIndex'})
  @ApiQuery({name:'pageSize'})
  @ApiQuery({
    name: 'search',
    required: false,  // Đặt required là false để không yêu cầu tham số này
    type: String,     // Xác định loại của tham số này (số trong trường hợp này)
  })
  @Get('phan-trang-tim-kiem')
  async findAllPageSearch(@Query() query:any){
    return this.nguoiDungService.findAllPageSearch(query)
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
 @ApiQuery({
    name: 'search',
    required: true,  // Đặt required là false để không yêu cầu tham số này
    type: String,     // Xác định loại của tham số này (số trong trường hợp này)
  })
  @Get('search-user')
  async search(@Query() query: any) {
    return this.nguoiDungService.findSearchUser(query);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nguoiDungService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updateNguoiDungDto: UpdateNguoiDungDto) {
    return this.nguoiDungService.update(+id, updateNguoiDungDto);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post('check-password/:id')
  checkPassword(@Param('id') id:string,@Body() password:createPasswordDto){
    return this.nguoiDungService.checkPassword(+id, password);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Put('update-password/:id')
  updatePassword(@Param('id') id:string,@Body() password:createPasswordDto){
    return this.nguoiDungService.updatePassword(+id, password);
  }


  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type:uploadTypeDto 
  })
  @UseInterceptors(FileInterceptorClass.getFileInterceptor())

   @Put('upload-file/:id')
  updateFile(@Param('id') id:string,@Body() updateNguoiDungDto:any,  @UploadedFile() file: Express.Multer.File){
    return this.nguoiDungService.update(+id, {...updateNguoiDungDto,image:file.filename});

  }


  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Người dùng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nguoiDungService.remove(+id);
  }
}
