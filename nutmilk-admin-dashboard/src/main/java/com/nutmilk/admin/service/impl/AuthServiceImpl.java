package com.nutmilk.admin.service.impl;

import com.nutmilk.admin.dto.auth.AuthResponse;
import com.nutmilk.admin.dto.auth.LoginRequest;
import com.nutmilk.admin.dto.auth.RegisterRequest;
import com.nutmilk.admin.entity.Role;
import com.nutmilk.admin.entity.User;
import com.nutmilk.admin.repository.UserRepository;
import com.nutmilk.admin.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }
        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        // In a real app, generate JWT here. For now returning a dummy token string "Bearer <username>"
        // or just the username to keep it simple for the frontend to store.
        String token = "dummy-token-" + user.getUsername();
        return new AuthResponse(token, user.getUsername(), user.getRole(), user.getFullName());
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
             throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
             throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setRole(Role.USER); // Default to USER

        userRepository.save(user);

        String token = "dummy-token-" + user.getUsername();
        return new AuthResponse(token, user.getUsername(), user.getRole(), user.getFullName());
    }
}
