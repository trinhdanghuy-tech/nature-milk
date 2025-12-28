package com.nutmilk.admin.entity;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChiTietPhieuNhapId implements Serializable {

    @Column(name = "ma_phieu_nhap")
    private Integer maPhieuNhap;

    @Column(name = "ma_san_pham")
    private Integer maSanPham;

    // getter / setter

    public Integer getMaPhieuNhap() {
        return maPhieuNhap;
    }

    public void setMaPhieuNhap(Integer maPhieuNhap) {
        this.maPhieuNhap = maPhieuNhap;
    }

    public Integer getMaSanPham() {
        return maSanPham;
    }

    public void setMaSanPham(Integer maSanPham) {
        this.maSanPham = maSanPham;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ChiTietPhieuNhapId)) return false;
        ChiTietPhieuNhapId that = (ChiTietPhieuNhapId) o;
        return Objects.equals(maPhieuNhap, that.maPhieuNhap)
                && Objects.equals(maSanPham, that.maSanPham);
    }

    @Override
    public int hashCode() {
        return Objects.hash(maPhieuNhap, maSanPham);
    }
}
