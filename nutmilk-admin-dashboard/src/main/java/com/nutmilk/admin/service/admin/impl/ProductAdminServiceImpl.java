package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.ProductRequest;
import com.nutmilk.admin.entity.SanPham;
import com.nutmilk.admin.entity.Kho;
import com.nutmilk.admin.repository.SanPhamRepository;
import com.nutmilk.admin.repository.KhoRepository;
import com.nutmilk.admin.service.admin.ProductAdminService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProductAdminServiceImpl implements ProductAdminService {

    private final SanPhamRepository sanPhamRepo;
    private final KhoRepository khoRepo;

    public ProductAdminServiceImpl(
            SanPhamRepository sanPhamRepo,
            KhoRepository khoRepo
    ) {
        this.sanPhamRepo = sanPhamRepo;
        this.khoRepo = khoRepo;
    }

    @Override
    public List<SanPham> getAll() {
        return sanPhamRepo.findAll();
    }

    @Override
    public SanPham create(ProductRequest req) {
        SanPham sp = new SanPham();
        sp.setTenSanPham(req.getTenSanPham());
        sp.setGiaBan(req.getGiaBan());
        sp.setMoTa(req.getMoTa());
        sp.setMaDanhMuc(req.getMaDanhMuc());
        sp.setHinhAnh(req.getHinhAnh());

        SanPham saved = sanPhamRepo.save(sp);

        // tạo tồn kho ban đầu
        Kho kho = new Kho();
        kho.setMaSanPham(saved.getMaSanPham());
        kho.setSoLuongTon(0);
        kho.setNgayCapNhat(LocalDateTime.now());
        khoRepo.save(kho);

        return saved;
    }

    @Override
    public SanPham update(Integer id, ProductRequest req) {
        SanPham sp = sanPhamRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        sp.setTenSanPham(req.getTenSanPham());
        sp.setGiaBan(req.getGiaBan());
        sp.setMoTa(req.getMoTa());
        sp.setMaDanhMuc(req.getMaDanhMuc());
        sp.setHinhAnh(req.getHinhAnh());

        return sanPhamRepo.save(sp);
    }

    @Override
    @Transactional
    public void delete(Integer id) {

        SanPham sp = sanPhamRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        sp.setTrangThai(0); // ngừng bán
        sanPhamRepo.save(sp);
    }

}
