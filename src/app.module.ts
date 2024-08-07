import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatPhongModule } from './dat-phong/dat-phong.module';
import { ViTriModule } from './vi-tri/vi-tri.module';

@Module({
  imports: [DatPhongModule, ViTriModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
