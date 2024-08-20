import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateDatPhongDto {
    id:0
    @ApiProperty()
    @IsNotEmpty()
    ma_phong:number
    @ApiProperty()
    @IsNotEmpty()
    ngay_den:Date
    @ApiProperty()
    @IsNotEmpty()
    ngay_di:Date
    @ApiProperty()
    @IsNotEmpty()
    so_luong_khach:number
    @ApiProperty()
    @IsNotEmpty()
    ma_nguoi_dat:number
}
