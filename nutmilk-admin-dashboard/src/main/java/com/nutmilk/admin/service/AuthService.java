package com.nutmilk.admin.service;

import com.nutmilk.admin.dto.auth.AuthResponse;
import com.nutmilk.admin.dto.auth.LoginRequest;
import com.nutmilk.admin.dto.auth.RegisterRequest;

public interface AuthService {
    AuthResponse login(LoginRequest request);
    AuthResponse register(RegisterRequest request);
}
