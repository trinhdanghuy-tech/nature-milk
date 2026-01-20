package com.nutmilk.admin.controller.user;

import com.nutmilk.admin.dto.cart.AddToCartRequest;
import com.nutmilk.admin.entity.Cart;
import com.nutmilk.admin.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null)
            return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(cartService.getCart(userDetails.getUsername()));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody AddToCartRequest request) {
        if (userDetails == null)
            return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(cartService.addToCart(userDetails.getUsername(), request));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<?> removeFromCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long itemId) {
        if (userDetails == null)
            return ResponseEntity.status(401).body("Unauthorized");
        return ResponseEntity.ok(cartService.removeFromCart(userDetails.getUsername(), itemId));
    }
}
