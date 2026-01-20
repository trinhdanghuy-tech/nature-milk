package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.entity.Role;
import com.nutmilk.admin.entity.User;
import com.nutmilk.admin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/staff")
@CrossOrigin("*")
public class AdminStaffController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getStaffs() {
        // Simple filter for now. Ideally use a custom query in repository
        List<User> all = userRepository.findAll();
        return all.stream()
                .filter(u -> u.getRole() == Role.STAFF || u.getRole() == Role.MANAGER || u.getRole() == Role.ADMIN)
                .collect(Collectors.toList());
    }

    // Additional methods (create, update, delete) can be added here
}
