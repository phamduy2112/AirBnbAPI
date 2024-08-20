import { Module } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriController } from './vi-tri.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ViTriModule,
  ],
  controllers: [ViTriController],
  providers: [ViTriService],
})
export class ViTriModule {}
