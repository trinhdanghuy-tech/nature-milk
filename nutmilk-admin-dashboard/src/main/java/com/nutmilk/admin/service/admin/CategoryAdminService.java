package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.CategoryRequest;
import com.nutmilk.admin.entity.DanhMucSanPham;

import java.util.List;

public interface CategoryAdminService {

    List<DanhMucSanPham> getAll();

    DanhMucSanPham create(CategoryRequest request);

    DanhMucSanPham update(Integer id, CategoryRequest request);

    void delete(Integer id);
}
