import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    JwtModule.register({
      global:true,
      secret:'123456',
      signOptions:{expiresIn:'1h'}
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
