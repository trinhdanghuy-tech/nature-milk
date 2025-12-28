package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.PhieuNhapHang;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PhieuNhapRepository
        extends JpaRepository<PhieuNhapHang, Integer> {
}

