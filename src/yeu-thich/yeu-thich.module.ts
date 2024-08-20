import { Module } from '@nestjs/common';
import { YeuThichService } from './yeu-thich.service';
import { YeuThichController } from './yeu-thich.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    YeuThichModule
  ],
  controllers: [YeuThichController],
  providers: [YeuThichService],
})
export class YeuThichModule {}
