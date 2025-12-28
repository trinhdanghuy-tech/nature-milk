package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.dto.admin.ImportRequest;
import com.nutmilk.admin.service.admin.ImportAdminService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/imports")
@CrossOrigin
public class ImportAdminController {

    private final ImportAdminService service;

    public ImportAdminController(ImportAdminService service) {
        this.service = service;
    }

    @PostMapping
    public Integer create(@RequestBody ImportRequest request) {
        return service.createImport(request);
    }
}
