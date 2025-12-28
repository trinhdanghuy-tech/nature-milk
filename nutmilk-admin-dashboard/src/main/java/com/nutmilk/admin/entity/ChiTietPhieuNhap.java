package com.nutmilk.admin.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "chi_tiet_phieu_nhap")
public class ChiTietPhieuNhap {

    @EmbeddedId
    private ChiTietPhieuNhapId id;

    @Column(name = "so_luong_nhap")
    private Integer soLuongNhap;

    @Column(name = "gia_nhap")
    private BigDecimal giaNhap;


    // getter / setter

    public ChiTietPhieuNhapId getId() {
        return id;
    }

    public void setId(ChiTietPhieuNhapId id) {
        this.id = id;
    }

    public Integer getSoLuongNhap() {
        return soLuongNhap;
    }

    public void setSoLuongNhap(Integer soLuongNhap) {
        this.soLuongNhap = soLuongNhap;
    }

    public BigDecimal getGiaNhap() {
        return giaNhap;
    }

    public void setGiaNhap(BigDecimal giaNhap) {
        this.giaNhap = giaNhap;
    }
}
