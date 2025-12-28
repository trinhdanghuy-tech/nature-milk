package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.DanhMucSanPham;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DanhMucRepository
        extends JpaRepository<DanhMucSanPham, Integer> {

    List<DanhMucSanPham> findByTrangThai(Integer trangThai);
}
