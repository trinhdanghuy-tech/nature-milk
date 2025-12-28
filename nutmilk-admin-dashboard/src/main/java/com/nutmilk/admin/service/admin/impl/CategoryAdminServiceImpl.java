package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.CategoryRequest;
import com.nutmilk.admin.entity.DanhMucSanPham;
import com.nutmilk.admin.repository.DanhMucRepository;
import com.nutmilk.admin.service.admin.CategoryAdminService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryAdminServiceImpl implements CategoryAdminService {

    private final DanhMucRepository repo;

    public CategoryAdminServiceImpl(DanhMucRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<DanhMucSanPham> getAll() {
        return repo.findByTrangThai(1);
    }

    @Override
    public DanhMucSanPham create(CategoryRequest req) {
        DanhMucSanPham dm = new DanhMucSanPham();
        dm.setTenDanhMuc(req.getTenDanhMuc());
        dm.setMoTa(req.getMoTa());
        dm.setTrangThai(1);
        return repo.save(dm);
    }

    @Override
    public DanhMucSanPham update(Integer id, CategoryRequest req) {
        DanhMucSanPham dm = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        dm.setTenDanhMuc(req.getTenDanhMuc());
        dm.setMoTa(req.getMoTa());
        return repo.save(dm);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        DanhMucSanPham dm = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục"));

        dm.setTrangThai(0); // soft delete
        repo.save(dm);
    }
}
