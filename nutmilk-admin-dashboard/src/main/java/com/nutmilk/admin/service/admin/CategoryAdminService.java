package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.CategoryRequest;
import com.nutmilk.admin.entity.Category;

import java.util.List;

public interface CategoryAdminService {

    List<Category> getAll();

    Category create(CategoryRequest request);

    Category update(Long id, CategoryRequest request);

    void delete(Long id);
}
