package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.Cart;
import com.nutmilk.admin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
}
