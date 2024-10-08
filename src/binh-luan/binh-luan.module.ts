import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanController } from './binh-luan.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [BinhLuanController],
  providers: [BinhLuanService],
})
export class BinhLuanModule {}
