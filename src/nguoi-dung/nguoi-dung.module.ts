import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
})
export class NguoiDungModule {}
