import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { SignAuthDto } from './dto/update-auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post('register')
  register(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @ApiResponse({status:200,description:"Thành công !"})
  @ApiResponse({status:400,description:"Email hoặc mật khẩu không tồn tại !"})
  @ApiResponse({status:500,description:"Thất bại !"})
  @Post('login')
  login(@Body() createAuthDto:SignAuthDto){
    return this.authService.login(createAuthDto);
  }

 
}
