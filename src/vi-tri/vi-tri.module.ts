import { Module } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriController } from './vi-tri.controller';


@Module({
  imports: [
    ViTriModule,
  ],
  controllers: [ViTriController],
  providers: [ViTriService],
})
export class ViTriModule {}
