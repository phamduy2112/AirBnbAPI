import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptorClass } from 'src/model/file.image';
import { AuthGuard } from 'src/auth/auth.guard';
class uploadTypeDto{
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}

@ApiBearerAuth()
@ApiTags("Phòng")
@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post()
  create(
    @Body() createPhongDto: CreatePhongDto,
) {
    return this.phongService.create(createPhongDto);
  }

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get()
  findAll() {
    return this.phongService.findAll();
  }
  @ApiQuery({
    name: 'search',
    required: false, 
    type: String,     
  })

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiQuery({name:'pageSize'})
  @ApiQuery({name:'pageIndex'})
  @Get('lay-phong-phan-trang-tim-kiem')
  findAllPageSearch(@Query() query:any){
    return this.phongService.findAllPageSearch(query)
  }

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phongService.findOne(+id);
  }


  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Get('lay-phong-theo-vi-tri/:id')
  findLocationToRoom(@Param('id') idLocation: string){
    return this.phongService.findLocationToRoom(+idLocation)
  }


  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiQuery({
    name: 'pageSize',
   
  })
  @ApiQuery({
    name: 'pageIndex',
   
  })
  @Get('lay-phong-theo-vi-tri-phan-trang/:id')
  findLocationToRoomPage(@Param('id') idLocation: string,@Query() query:any){
    return this.phongService.findLocationToRoomPage(query,+idLocation)
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePhongDto: UpdatePhongDto,
) {
    return this.phongService.update(+id, updatePhongDto);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Phòng không tồn tại ! hoặc Vị trí không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phongService.remove(+id);
  }


  @UseGuards(AuthGuard)
  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:404,description:"Phòng không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type:uploadTypeDto 
  })
  @UseInterceptors(FileInterceptorClass.getFileInterceptor())
  @Put('upload/:id')
  updateImage(@Param('id') id: string, 
  @Body() updatePhongDto: UpdatePhongDto,
  @UploadedFile() file: Express.Multer.File

) {
    return this.phongService.updateImage(+id, {...updatePhongDto,hinh_anh:file.filename});
  }

}
