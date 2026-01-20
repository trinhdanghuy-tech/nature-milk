package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.entity.Order;
import java.util.List;

public interface AdminOrderService {
    List<Order> getAllOrders();
    Order updateStatus(Long orderId, String status);
}
