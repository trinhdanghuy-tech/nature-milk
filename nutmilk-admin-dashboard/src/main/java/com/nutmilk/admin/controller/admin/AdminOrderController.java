package com.nutmilk.admin.controller.admin;

import com.nutmilk.admin.entity.Order;
import com.nutmilk.admin.service.admin.AdminOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
@CrossOrigin(origins = "*")
public class AdminOrderController {

    @Autowired
    private AdminOrderService adminOrderService;

    @GetMapping
    public List<Order> getAllOrders() {
        return adminOrderService.getAllOrders();
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(@PathVariable Long id, @RequestParam String status) {
        return adminOrderService.updateStatus(id, status);
    }
}
