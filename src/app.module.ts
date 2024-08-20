import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { AuthModule } from './auth/auth.module';
import { PhongModule } from './phong/phong.module';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { YeuThichModule } from './yeu-thich/yeu-thich.module';

@Module({
  imports: [ ViTriModule, AuthModule, PhongModule, BinhLuanModule, DatPhongModule, NguoiDungModule, YeuThichModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
