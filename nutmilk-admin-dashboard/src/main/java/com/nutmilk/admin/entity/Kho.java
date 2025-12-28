package com.nutmilk.admin.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "kho")
public class Kho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maKho;

    @Column(name = "ma_san_pham")
    private Integer maSanPham;

    private Integer soLuongTon;

    private LocalDateTime ngayCapNhat;

    // getter / setter

    public Integer getMaKho() {
        return maKho;
    }

    public void setMaKho(Integer maKho) {
        this.maKho = maKho;
    }

    public Integer getMaSanPham() {
        return maSanPham;
    }

    public void setMaSanPham(Integer maSanPham) {
        this.maSanPham = maSanPham;
    }

    public Integer getSoLuongTon() {
        return soLuongTon;
    }

    public void setSoLuongTon(Integer soLuongTon) {
        this.soLuongTon = soLuongTon;
    }

    public LocalDateTime getNgayCapNhat() {
        return ngayCapNhat;
    }

    public void setNgayCapNhat(LocalDateTime ngayCapNhat) {
        this.ngayCapNhat = ngayCapNhat;
    }
}


