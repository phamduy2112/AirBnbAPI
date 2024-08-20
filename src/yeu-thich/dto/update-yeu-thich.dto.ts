import { PartialType } from '@nestjs/swagger';
import { CreateYeuThichDto } from './create-yeu-thich.dto';

export class UpdateYeuThichDto extends PartialType(CreateYeuThichDto) {}
