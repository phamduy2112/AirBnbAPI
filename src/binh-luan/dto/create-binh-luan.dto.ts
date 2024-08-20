import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateBinhLuanDto {
    @ApiProperty()
    @IsNotEmpty()
ma_phong:number
@ApiProperty()
@IsNotEmpty()
ma_nguoi_binh_luan:number
@ApiProperty()
@IsNotEmpty()
ngay_binh_luan: Date
@ApiProperty()
@IsNotEmpty()
noi_dung:string
@ApiProperty()
@IsNotEmpty()
sao_binh_luan:number
}
