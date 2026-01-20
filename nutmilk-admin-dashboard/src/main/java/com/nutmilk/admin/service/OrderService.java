package com.nutmilk.admin.service;

import com.nutmilk.admin.dto.order.OrderRequest;
import com.nutmilk.admin.entity.Order;

public interface OrderService {
    Order createOrder(String username, OrderRequest request);
}
