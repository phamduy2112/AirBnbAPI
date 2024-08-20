-- Tạo cơ sở dữ liệu
-- CREATE DATABASE QuanLyKhachSan;

-- Sử dụng cơ sở dữ liệu vừa tạo
USE dbAirbnb;

-- Tạo bảng NguoiDung
CREATE TABLE NguoiDung (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255),
    pass_word VARCHAR(255),
    phone VARCHAR(20),
    birth_day VARCHAR(20),
    gender VARCHAR(10),
    image VARCHAR(100) null,
    role VARCHAR(50)
);


-- Tạo bảng ViTri
CREATE TABLE ViTri (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_vi_tri VARCHAR(255),
    tinh_thanh VARCHAR(255),
    quoc_gia VARCHAR(255),
    hinh_anh VARCHAR(255)
);
-- Tạo bảng Phong
CREATE TABLE Phong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ten_phong VARCHAR(255),
    khach INT,
    phong_ngu INT,
    phong_tam INT,
    id_viTri INT,
    mo_ta VARCHAR(255),
    gia_tien INT,
    may_giat BOOLEAN,
    ban_la BOOLEAN,
    tivi BOOLEAN,
    dieu_hoa BOOLEAN,
    wifi BOOLEAN,
    bep BOOLEAN,
    do_xe BOOLEAN,
    ho_boi BOOLEAN,
    ban_ui BOOLEAN,
    hinh_anh VARCHAR(255),
     FOREIGN KEY (id_viTri) REFERENCES ViTri(id)
);

-- Tạo bảng DatPhong
CREATE TABLE DatPhong (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong INT,
    ngay_den DATETIME,
    ngay_di DATETIME,
    so_luong_khach INT,
    ma_nguoi_dat INT,
    FOREIGN KEY (ma_phong) REFERENCES Phong(id),
    FOREIGN KEY (ma_nguoi_dat) REFERENCES NguoiDung(id)
);
-- T ạ o b ả ng BinhLuan CREATE TABLE BinhLuan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong INT,
    ma_nguoi_binh_luan INT,
    ngay_binh_luan DATETIME,
    noi_dung VARCHAR(255),
    sao_binh_luan INT,
    FOREIGN KEY (ma_nguoi_binh_luan) REFERENCES NguoiDung(id)
);

CREATE TABLE PhongYeuThich (
    id_yeu_thich INT PRIMARY KEY AUTO_INCREMENT,
    ma_phong_yeu_thich INT,
    ma_nguoi_yeu_thich INT,
   
    FOREIGN KEY (ma_phong_yeu_thich) REFERENCES Phong(id),
    FOREIGN KEY (ma_nguoi_yeu_thich) REFERENCES NguoiDung(id)
);



-- thêm

INSERT INTO ViTri (ten_vi_tri,tinh_thanh,quoc_gia,hinh_anh) values ("ABC","DFG","Viet Nam","")