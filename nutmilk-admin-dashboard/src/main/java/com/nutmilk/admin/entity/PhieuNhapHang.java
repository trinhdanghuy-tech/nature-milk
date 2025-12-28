package com.nutmilk.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "phieu_nhap_hang")
public class PhieuNhapHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maPhieuNhap;

    private LocalDateTime ngayNhap;

    @Column(name = "ma_nha_cung_cap")
    private Integer maNhaCungCap;

    @Column(name = "ma_nhan_vien")
    private Integer maNhanVien;

    // getter / setter

    public Integer getMaPhieuNhap() {
        return maPhieuNhap;
    }

    public void setMaPhieuNhap(Integer maPhieuNhap) {
        this.maPhieuNhap = maPhieuNhap;
    }

    public LocalDateTime getNgayNhap() {
        return ngayNhap;
    }

    public void setNgayNhap(LocalDateTime ngayNhap) {
        this.ngayNhap = ngayNhap;
    }

    public Integer getMaNhaCungCap() {
        return maNhaCungCap;
    }

    public void setMaNhaCungCap(Integer maNhaCungCap) {
        this.maNhaCungCap = maNhaCungCap;
    }

    public Integer getMaNhanVien() {
        return maNhanVien;
    }

    public void setMaNhanVien(Integer maNhanVien) {
        this.maNhanVien = maNhanVien;
    }
}
