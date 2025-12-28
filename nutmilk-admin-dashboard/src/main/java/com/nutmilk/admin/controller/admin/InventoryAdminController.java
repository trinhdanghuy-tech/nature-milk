package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.dto.admin.InventoryResponse;
import com.nutmilk.admin.service.admin.InventoryAdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/inventory")
@CrossOrigin
public class InventoryAdminController {

    private final InventoryAdminService service;

    public InventoryAdminController(InventoryAdminService service) {
        this.service = service;
    }

    @GetMapping
    public List<InventoryResponse> getInventory() {
        return service.getInventory();
    }
}
