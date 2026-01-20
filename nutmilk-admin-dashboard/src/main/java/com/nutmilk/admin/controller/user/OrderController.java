package com.nutmilk.admin.controller.user;

import com.nutmilk.admin.dto.order.OrderRequest;
import com.nutmilk.admin.entity.Order;
import com.nutmilk.admin.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody OrderRequest request) {
        if (userDetails == null)
            return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(orderService.createOrder(userDetails.getUsername(), request));
    }
}
