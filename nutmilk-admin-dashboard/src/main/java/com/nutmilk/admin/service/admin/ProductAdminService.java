package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.ProductRequest;
import com.nutmilk.admin.entity.Product;

import java.util.List;

public interface ProductAdminService {

    List<Product> getAll();

    Product create(ProductRequest request);

    Product update(Long id, ProductRequest request);

    void delete(Long id);
}
