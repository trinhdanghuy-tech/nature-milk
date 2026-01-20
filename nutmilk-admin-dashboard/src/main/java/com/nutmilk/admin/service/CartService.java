package com.nutmilk.admin.service;

import com.nutmilk.admin.dto.cart.AddToCartRequest;
import com.nutmilk.admin.entity.Cart;

public interface CartService {
    Cart getCart(String username);
    Cart addToCart(String username, AddToCartRequest request);
    Cart removeFromCart(String username, Long cartItemId);
    void clearCart(String username);
}
