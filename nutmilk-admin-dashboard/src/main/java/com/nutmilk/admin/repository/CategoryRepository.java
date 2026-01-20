package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Custom queries if needed (mapped by method name convention)
}
