package com.nutmilk.admin.config;

import com.nutmilk.admin.entity.Role;
import com.nutmilk.admin.entity.User;
import com.nutmilk.admin.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Ensure email exists (Facebook might not return email without proper
        // permissions)
        if (email == null) {
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/login?error=no_email")
                    .build().toUriString();
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
            return;
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        User user;

        if (userOpt.isPresent()) {
            user = userOpt.get();
            // Update info if needed
        } else {
            // Register new user
            user = new User();
            user.setEmail(email);
            user.setUsername(email); // Use email as username for OAuth2
            user.setFullName(name != null ? name : "User");
            user.setRole(Role.USER);
            user.setPassword(""); // No password for OAuth2 users
            userRepository.save(user);
        }

        // Generate Token (Dummy for now, consistent with AuthServiceImpl)
        String token = "dummy-token-" + user.getUsername();

        // Redirect to Frontend with Token
        String targetUrl = UriComponentsBuilder.fromUriString("http://localhost:5173/oauth2/redirect")
                .queryParam("token", token)
                .queryParam("username", user.getUsername())
                .queryParam("role", user.getRole().name())
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
