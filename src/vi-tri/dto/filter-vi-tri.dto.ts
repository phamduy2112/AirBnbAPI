import { ApiProperty } from "@nestjs/swagger";

export class FilterViTriDto{
    @ApiProperty()
    pageIndex:number;
    @ApiProperty()
    pageSize:number;
    @ApiProperty()
    search?: string
}