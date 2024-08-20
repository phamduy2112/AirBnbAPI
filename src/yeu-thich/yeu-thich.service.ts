import { Injectable } from '@nestjs/common';
import { CreateYeuThichDto } from './dto/create-yeu-thich.dto';
import { UpdateYeuThichDto } from './dto/update-yeu-thich.dto';
import { responseSend } from 'src/model/response';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class YeuThichService {
  prisma = new PrismaClient();

  async create(createYeuThichDto: CreateYeuThichDto) {
    try {
      const checkUser = await this.prisma.nguoiDung.findUnique({
        where: {
          id: createYeuThichDto.ma_nguoi_yeu_thich,
        },
      });
      if (!checkUser) {
        return responseSend(null, 'Người dùng không tồn tại !', 404);
      }
      const checkRoom = await this.prisma.phong.findUnique({
        where: {
          id: createYeuThichDto.ma_phong_yeu_thich,
        },
      });

      if (!checkRoom) {
        return responseSend(null, 'Phòng không tồn tại !', 404);
      }
      // check nếu mà phòng đã tồn tại cùng với mã người dùng

      const checkProductIdUser = await this.prisma.phongYeuThich.findFirst({
        where: {
          ma_nguoi_yeu_thich: createYeuThichDto.ma_nguoi_yeu_thich,
          ma_phong_yeu_thich: createYeuThichDto.ma_phong_yeu_thich,
        },
      });
      if (checkProductIdUser) {
        return responseSend(
          '',
          'Thêm thất bại vì đã có phòng của người dùng được thêm vào yêu thích !',
          200,
        );
      }
      const createLoveProduct = await this.prisma.phongYeuThich.create({
        data: createYeuThichDto,
      });

      return responseSend(createLoveProduct, 'Thêm thành công !', 200);
    } catch (e) {
      return responseSend(e, 'Thất bại !', 500);
    }
  }

  // theo idUser
  async findAllByIdUserPage(idUser: number, query: any) {
    try {
      const pageIndex = Number(query.pageIndex); // Trang hiện tại, mặc định là 1
      const pageSize = Number(query.pageSize); // Số bản ghi mỗi trang, mặc định là 10
      // kiểm tra đầu vào pageIndex và pageSize phải lớn hơn 0
      if (!(pageIndex > 0 && pageSize > 0)) {
        return responseSend(null, 'Phải lớn hơn 0 !', 500);
      }

      const skip = (pageIndex - 1) * pageSize; // Số bản ghi cần bỏ qua
      const checkUser = await this.prisma.nguoiDung.findUnique({
        where: {
          id: idUser,
        },
      });
      if (!checkUser) {
        return responseSend(null, 'Người dùng không tồn tại !', 404);
      }

      const listLoveProductByIdUser = await this.prisma.phongYeuThich.findMany({
        skip,
        take: pageSize,
        where: {
          ma_nguoi_yeu_thich: idUser,
        },
        include: {
          Phong: true,
        },
      });

      return responseSend(listLoveProductByIdUser, 'Thêm thành công !', 200);
    } catch (e) {
      return responseSend(e, 'Thất bại !', 500);
    }
  }

  async remove(id: number) {
    const checkLoveProduct = await this.prisma.phongYeuThich.findUnique({
      where: {
        id_yeu_thich: id,
      },
    });
    if (!checkLoveProduct) {
      return responseSend(null, 'Mã phòng yêu thích không tồn tại !', 404);
    }
    const deleteLoveProduct = await this.prisma.phongYeuThich.delete({
      where: {
        id_yeu_thich: id,
      },
    });
    return responseSend(null, 'Xóa thành công !', 200);
  }
}
