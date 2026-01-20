package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}
