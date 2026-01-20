package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.CategoryRequest;
import com.nutmilk.admin.entity.Category;
import com.nutmilk.admin.repository.CategoryRepository;
import com.nutmilk.admin.service.admin.CategoryAdminService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryAdminServiceImpl implements CategoryAdminService {

    private final CategoryRepository repo;

    public CategoryAdminServiceImpl(CategoryRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Category> getAll() {
        return repo.findAll();
    }

    @Override
    public Category create(CategoryRequest req) {
        Category c = new Category();
        c.setName(req.getName());
        c.setDescription(req.getDescription());
        return repo.save(c);
    }

    @Override
    public Category update(Long id, CategoryRequest req) {
        Category c = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        c.setName(req.getName());
        c.setDescription(req.getDescription());
        return repo.save(c);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
