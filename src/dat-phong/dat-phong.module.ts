import { Module } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { DatPhongController } from './dat-phong.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [DatPhongController],
  providers: [DatPhongService],
})
export class DatPhongModule {}
