import { ApiProperty } from "@nestjs/swagger";

export class CreateYeuThichDto {
    
    @ApiProperty()
    ma_phong_yeu_thich:number;

    @ApiProperty()
    ma_nguoi_yeu_thich:number;
}
