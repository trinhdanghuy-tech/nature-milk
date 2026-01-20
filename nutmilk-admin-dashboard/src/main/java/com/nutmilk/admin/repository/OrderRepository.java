package com.nutmilk.admin.repository;

import com.nutmilk.admin.entity.Order;
import com.nutmilk.admin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);
}
