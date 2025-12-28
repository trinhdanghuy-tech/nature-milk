package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.Kho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface KhoRepository extends JpaRepository<Kho, Integer> {

    @Query("""
        SELECT k.maSanPham, s.tenSanPham, k.soLuongTon
        FROM Kho k
        JOIN SanPham s ON k.maSanPham = s.maSanPham
    """)
    List<Object[]> getInventoryRaw();
    Optional<Kho> findByMaSanPham(Integer maSanPham);
}
