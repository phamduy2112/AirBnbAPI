import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto, createPasswordDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { responseSend } from 'src/model/response';
import * as bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class NguoiDungService {
  



  prisma=new PrismaClient();

  async create(createNguoiDungDto: CreateNguoiDungDto) {
    try{
   const existingUser = await this.prisma.nguoiDung.findFirst({
     where: {
         email: createNguoiDungDto.email,
     },
 });
 
 if (existingUser) {
 return responseSend('','Trùng Email',400)
 }
   const hashPassword=await this.hashPassword(createNguoiDungDto.pass_word);
     const createUser= await this.prisma.nguoiDung.create({data:{...createNguoiDungDto,pass_word:hashPassword}});
     return responseSend(createUser,"Thành công !",200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }

   }
 
   async findAll() {
    try{
  const user= await this.prisma.nguoiDung.findMany(
       {
       select:{
        id:true,
         name:true,
         email:true,
         phone:true,
         birth_day:true,
         gender:true,
         role:true,
       }
     }
   );
     return responseSend(user,"Thành công !",200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }
   
 
   }
 
   async findOne(id: number) {
    try{
      const checkUser=await this.prisma.nguoiDung.findUnique({
        where:{
          id
        }
      }) 
       if(!checkUser){
      return responseSend(null, "Người dùng không tồn tại !", 404);

     }
   const userId= await this.prisma.nguoiDung.findMany({
       where:{
         id
       },  
         select:{
          id:true,
           name:true,
           email:true,
           phone:true,
           birth_day:true,
           gender:true,
           role:true,
         }
       
       
 
     });
   
     return responseSend(userId,"Thành công !",200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }
  
 
   }
   // phân trang , tìm kiếm
 
   async findAllPageSearch(query: any) {
    try{
  const pageIndex =Number(query.pageIndex || 1); // Trang hiện tại, mặc định là 1
     const pageSize = Number(query.pageSize || 2);   // Số bản ghi mỗi trang, mặc định là 10
     const search = query.search || '';       // Tìm kiếm
   
     const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
   
     const findAllPageSearch= await this.prisma.nguoiDung.findMany({
       skip,
       take:pageSize,
       where: {
         name: {
           contains: search,
         },
       },
     });
     return responseSend(findAllPageSearch,"Thành công !",200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }
   

   }
 
 
   async update(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {
    try{
      const checkUser=await this.prisma.nguoiDung.findUnique({
        where:{
          id
        }
      }) 
       if(!checkUser){
      return responseSend(null, "Người dùng không tồn tại !", 404);

     }
const updateUSer= await this.prisma.nguoiDung.update({

       where:{
         id
       },
       data:updateNguoiDungDto
     });
     return responseSend(updateUSer,"Thành công !",200)
 
    } catch(e){
      return responseSend(e, "Thất bại !", 500);

    }
    
   }
 
   async remove(id: number) {
    try{
      const checkUser=await this.prisma.nguoiDung.findUnique({
        where:{
          id
        }
      }) 
       if(!checkUser){
      return responseSend(null, "Người dùng không tồn tại !", 404);

     }
  const deteleUser= await this.prisma.nguoiDung.delete({
       where:{
         id
       }
     });

     return responseSend(null,"Thành công !",200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }
   
 
   }
   // kiểm tra password: làm trong trang protofile
   async checkPassword(id:number,password:createPasswordDto){
    try{
 const checkUser=await this.prisma.nguoiDung.findUnique({
       where:{
         id
       },  
     });
     if(!checkUser){
       return responseSend('',"Người dùng không tồn tại !",400);
     }
     const checkPassword = await bcrypt.compare(password.pass_word, checkUser.pass_word);
     if(!checkPassword){
       return responseSend("","Mật khẩu không khớp",400);
 
     }
 
     return responseSend("","Check Thành công !",200)
 
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }
    
   }
   // đổi password
   async updatePassword(id:number,password:{pass_word:string}){
    try{
     const checkUser=await this.prisma.nguoiDung.findUnique({
       where:{
         id
       },  
     });
     if(!checkUser){
       return responseSend('',"Người dùng không tồn tại !",400);
     }
     const hashPassword=await this.hashPassword(password.pass_word);
 
     const updateUSer= await this.prisma.nguoiDung.update({
       where:{
         id
       },
       data:{
         pass_word:hashPassword
       }
     });
     return responseSend("","Đổi Thành công !",200)
    }catch(e){
      return responseSend(e, "Thất bại !", 500);

    }

 
   }
   
   private async hashPassword(password:string){
     const saltRound=10;
     const salt=await bcrypt.genSalt(saltRound);
     const hash=await bcrypt.hash(password,salt);
     return hash
   }
 
 
 // tìm kiếm theo tên user 
 async findSearchUser(query:any){
  try{
   const search = query.search || '';   
   const searchUser=await this.prisma.nguoiDung.findMany({
     where:{
       name:{
         contains:search
       }
     }
   })
   return responseSend(searchUser,"Thành công !",200)
 
  }catch(e){
    return responseSend(e, "Thất bại !", 500);

  }

 }
 
 
}