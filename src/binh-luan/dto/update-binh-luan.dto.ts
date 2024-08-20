import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBinhLuanDto } from './create-binh-luan.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateBinhLuanDto {
    @ApiProperty()
@IsNotEmpty()
noi_dung:string;
@ApiProperty()
@IsNotEmpty()
ngay_binh_luan:Date;
@ApiProperty()
@IsNotEmpty()
sao_binh_luan:number
}
