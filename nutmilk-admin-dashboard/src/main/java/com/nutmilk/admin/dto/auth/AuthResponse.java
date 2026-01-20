package com.nutmilk.admin.dto.auth;

import com.nutmilk.admin.entity.Role;

public class AuthResponse {
    private String token; // For now maybe just username or dummy token
    private String username;
    private Role role;
    private String fullName;

    public AuthResponse(String token, String username, Role role, String fullName) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.fullName = fullName;
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
}
