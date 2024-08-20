import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDatPhongDto } from './create-dat-phong.dto';

export class UpdateDatPhongDto extends OmitType(CreateDatPhongDto, ['ma_nguoi_dat','ma_phong'] as const) {}
