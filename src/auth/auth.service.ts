import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/create-auth.dto';
import { SignAuthDto } from './dto/update-auth.dto';
import { PrismaClient } from '@prisma/client';
import { responseSend } from 'src/model/response';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  prisma=new PrismaClient();
  constructor(private jwtService:JwtService){}

  async register(createAuthDto: RegisterAuthDto) {
    try{
      const hashPassword = await this.hashPassword(createAuthDto.pass_word);
      const existingUser = await this.prisma.nguoiDung.findFirst({
          where: {
              email: createAuthDto.email,
          },
      });
  
      if (existingUser) {
     return responseSend('','Trùng Email',400)
      }
  
   const addUser= await this.prisma.nguoiDung.create({
          data: { ...createAuthDto, pass_word: hashPassword },
      });
    return  responseSend(addUser,'Thành công',200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);
    }
   
}
async login(createAuthDto: SignAuthDto) {
  const checkUser = await this.prisma.nguoiDung.findFirst({
      where: {
          email: createAuthDto.email,
      },
  });

  if (!checkUser) {
      return responseSend('', 'Email hoặc mật khẩu không tồn tại !', 400);
  }

  const checkPassword = await bcrypt.compare(createAuthDto.pass_word, checkUser.pass_word);
  if (!checkPassword) {
      return responseSend('', 'Email hoặc mật khẩu không tồn tại !', 400);
  }

  const payload = { id: checkUser.id, role: checkUser.role, email: checkUser.email };
  const access_token = await this.generaToken(payload);

  return responseSend(access_token, 'Đăng nhập thành công!', 200);
}
private async hashPassword(password:string){
  const saltRound=10;
  const salt=await bcrypt.genSalt(saltRound);
  const hash=await bcrypt.hash(password,salt);
  return hash
}
private async generaToken (payload:{id:number,email:string,role:string}){
const access_token=await this.jwtService.signAsync(payload)

return {access_token}
}
}
