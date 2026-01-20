package com.nutmilk.admin.controller.user;

import com.nutmilk.admin.entity.User;
import com.nutmilk.admin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.nio.file.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/profile")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/avatars/";

    @GetMapping
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null)
            return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> userOpt = userRepository.findByUsername(userDetails.getUsername());
        if (userOpt.isEmpty())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok(userOpt.get());
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(value = "fullName", required = false) String fullName,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {
        if (userDetails == null)
            return ResponseEntity.status(401).body("Unauthorized");

        Optional<User> userOpt = userRepository.findByUsername(userDetails.getUsername());
        if (userOpt.isEmpty())
            return ResponseEntity.notFound().build();

        User user = userOpt.get();

        if (fullName != null)
            user.setFullName(fullName);
        if (phone != null)
            user.setPhone(phone);
        if (address != null)
            user.setAddress(address);

        if (avatar != null && !avatar.isEmpty()) {
            try {
                String fileName = StringUtils.cleanPath(avatar.getOriginalFilename());
                // Simple unique name
                String uniqueFileName = System.currentTimeMillis() + "_" + fileName;

                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                try (var inputStream = avatar.getInputStream()) {
                    Files.copy(inputStream, uploadPath.resolve(uniqueFileName), StandardCopyOption.REPLACE_EXISTING);
                    // Store relative path or full URL. Usually relative + configured resource
                    // handler.
                    user.setAvatar("/uploads/avatars/" + uniqueFileName);
                }
            } catch (IOException e) {
                return ResponseEntity.internalServerError().body("Could not upload avatar");
            }
        }

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
