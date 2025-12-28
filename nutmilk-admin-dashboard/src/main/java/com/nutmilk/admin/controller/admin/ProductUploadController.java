package com.nutmilk.admin.controller.admin;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/admin/upload")
public class ProductUploadController {

    private static final String UPLOAD_DIR = "uploads/products/";

    @PostMapping("/product-image")
    public String uploadProductImage(@RequestParam("file") MultipartFile file) throws IOException {

        File dir = new File(UPLOAD_DIR);
        if (!dir.exists()) dir.mkdirs();

        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path path = Paths.get(UPLOAD_DIR + fileName);

        Files.copy(file.getInputStream(), path);

        return "/uploads/products/" + fileName;
    }
}
