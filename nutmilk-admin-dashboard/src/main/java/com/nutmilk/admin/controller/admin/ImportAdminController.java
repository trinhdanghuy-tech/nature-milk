package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.dto.admin.ImportRequest;
import com.nutmilk.admin.entity.User;
import com.nutmilk.admin.repository.UserRepository;
import com.nutmilk.admin.service.admin.ImportAdminService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/imports")
@CrossOrigin
public class ImportAdminController {

    private final ImportAdminService service;
    private final UserRepository userRepository;

    public ImportAdminController(ImportAdminService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Long create(@AuthenticationPrincipal UserDetails userDetails, @RequestBody ImportRequest request) {
        if (userDetails != null) {
            User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (user != null) {
                request.setEmployeeId(user.getId());
            }
        }
        return service.createImport(request);
    }

    @GetMapping
    public java.util.List<com.nutmilk.admin.entity.ImportTicket> getHistory() {
        return service.getHistory();
    }
}
