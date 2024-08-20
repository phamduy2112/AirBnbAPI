import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [PhongController],
  providers: [PhongService],
})
export class PhongModule {}
