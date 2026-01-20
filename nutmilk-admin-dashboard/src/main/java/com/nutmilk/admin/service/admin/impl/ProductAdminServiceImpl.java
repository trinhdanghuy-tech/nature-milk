package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.ProductRequest;
import com.nutmilk.admin.entity.Category;
import com.nutmilk.admin.entity.Inventory;
import com.nutmilk.admin.entity.Product;
import com.nutmilk.admin.repository.CategoryRepository;
import com.nutmilk.admin.repository.InventoryRepository;
import com.nutmilk.admin.repository.ProductRepository;
import com.nutmilk.admin.service.admin.ProductAdminService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductAdminServiceImpl implements ProductAdminService {

    private final ProductRepository productRepo;
    private final InventoryRepository inventoryRepo;
    private final CategoryRepository categoryRepo;

    public ProductAdminServiceImpl(
            ProductRepository productRepo,
            InventoryRepository inventoryRepo,
            CategoryRepository categoryRepo) {
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<Product> getAll() {
        return productRepo.findAll();
    }

    @Override
    public Product create(ProductRequest req) {
        Product p = new Product();
        p.setName(req.getName());
        p.setPrice(req.getPrice());
        p.setDescription(req.getDescription());

        if (req.getCategoryId() != null) {
            Category c = categoryRepo.findById(req.getCategoryId()).orElse(null);
            p.setCategory(c);
        }

        p.setImage(req.getImage());
        p.setStatus(1); // Active by default

        Product saved = productRepo.save(p);

        // Initialize inventory
        Inventory inv = new Inventory();
        inv.setProductId(saved.getId());
        inv.setQuantity(0);
        inventoryRepo.save(inv);

        return saved;
    }

    @Override
    public Product update(Long id, ProductRequest req) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setName(req.getName());
        p.setPrice(req.getPrice());
        p.setDescription(req.getDescription());

        if (req.getCategoryId() != null) {
            Category c = categoryRepo.findById(req.getCategoryId()).orElse(null);
            p.setCategory(c);
        } else {
            p.setCategory(null);
        }

        p.setImage(req.getImage());

        return productRepo.save(p);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        p.setStatus(0); // Soft delete / switch status
        productRepo.save(p);
    }

}
