package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.ProductRequest;
import com.nutmilk.admin.entity.SanPham;

import java.util.List;

public interface ProductAdminService {

    List<SanPham> getAll();

    SanPham create(ProductRequest request);

    SanPham update(Integer id, ProductRequest request);

    void delete(Integer id);
}
