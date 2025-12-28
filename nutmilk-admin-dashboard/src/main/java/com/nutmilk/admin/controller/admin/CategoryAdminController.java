package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.dto.admin.CategoryRequest;
import com.nutmilk.admin.entity.DanhMucSanPham;
import com.nutmilk.admin.service.admin.CategoryAdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
@CrossOrigin
public class CategoryAdminController {

    private final CategoryAdminService service;

    public CategoryAdminController(CategoryAdminService service) {
        this.service = service;
    }

    @GetMapping
    public List<DanhMucSanPham> getAll() {
        return service.getAll();
    }

    @PostMapping
    public DanhMucSanPham create(@RequestBody CategoryRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public DanhMucSanPham update(
            @PathVariable Integer id,
            @RequestBody CategoryRequest request
    ) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
