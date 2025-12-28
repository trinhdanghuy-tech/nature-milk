package com.nutmilk.admin.dto.admin;

import java.math.BigDecimal;
import java.util.List;

public class ImportRequest {

    private Integer maNhaCungCap;
    private Integer maNhanVien;
    private List<Item> items;


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

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item {

        private Integer maSanPham;
        private Integer soLuongNhap;
        private BigDecimal giaNhap;

        public Integer getMaSanPham() {
            return maSanPham;
        }

        public void setMaSanPham(Integer maSanPham) {
            this.maSanPham = maSanPham;
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
}
