import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePhongDto {

    @ApiProperty()
    @IsNotEmpty()
    ten_phong:string;

    @ApiProperty()
    @IsNotEmpty()
    khach:number

    @ApiProperty()
    @IsNotEmpty()
    id_viTri:number

    @ApiProperty()
    @IsNotEmpty()
    phong_ngu:number;

    @ApiProperty()
    @IsNotEmpty()
    phong_tam:number;

    @ApiProperty()
    @IsNotEmpty()
    mo_ta:string;

    @ApiProperty()
    @IsNotEmpty()
    gia_tien:number;

    @ApiProperty()
    @IsNotEmpty()
    may_giat:boolean;
 
    @ApiProperty()
    @IsNotEmpty()
    ban_la:boolean;
    @ApiProperty()
    @IsNotEmpty()
    tivi:boolean;

    @ApiProperty()
    @IsNotEmpty()
    dieu_hoa:boolean;

    @ApiProperty()
    @IsNotEmpty()
    wifi:boolean;

    @ApiProperty()
    @IsNotEmpty()
    bep:boolean;

    @ApiProperty()
    @IsNotEmpty()
    do_xe:boolean;

    @ApiProperty()
    @IsNotEmpty()
    ho_boi:boolean;

    @ApiProperty()
    @IsNotEmpty()
    ban_ui:boolean;

    @ApiProperty()
    @IsNotEmpty()
    hinh_anh:string
}
