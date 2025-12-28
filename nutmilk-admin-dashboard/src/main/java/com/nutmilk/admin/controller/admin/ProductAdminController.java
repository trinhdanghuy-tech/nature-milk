package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.dto.admin.ProductRequest;
import com.nutmilk.admin.entity.SanPham;
import com.nutmilk.admin.service.admin.ProductAdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin
public class ProductAdminController {

    private final ProductAdminService service;

    public ProductAdminController(ProductAdminService service) {
        this.service = service;
    }

    @GetMapping
    public List<SanPham> getAll() {
        return service.getAll();
    }

    // 🔴 BẮT BUỘC PHẢI CÓ
    @PostMapping
    public SanPham create(@RequestBody ProductRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public SanPham update(
            @PathVariable Integer id,
            @RequestBody ProductRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}

