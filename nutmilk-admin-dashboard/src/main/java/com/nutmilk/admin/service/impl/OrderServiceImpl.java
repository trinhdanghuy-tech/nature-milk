package com.nutmilk.admin.service.impl;

import com.nutmilk.admin.dto.order.OrderRequest;
import com.nutmilk.admin.entity.*;
import com.nutmilk.admin.repository.InventoryRepository;
import com.nutmilk.admin.repository.OrderRepository;
import com.nutmilk.admin.service.CartService;
import com.nutmilk.admin.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CartService cartService;
    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    @Transactional
    public Order createOrder(String username, OrderRequest request) {
        Cart cart = cartService.getCart(username);
        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(cart.getUser());
        order.setShippingAddress(request.getShippingAddress());
        order.setShippingPhone(request.getShippingPhone());
        order.setStatus("PENDING");

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem item : cart.getItems()) {
            OrderDetail detail = new OrderDetail();
            detail.setOrder(order);
            detail.setProduct(item.getProduct());
            detail.setQuantity(item.getQuantity());
            detail.setPrice(item.getProduct().getPrice());

            // Check inventory
            Inventory inventory = inventoryRepository.findByProductId(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException(
                            "Product not found in inventory: " + item.getProduct().getId()));

            if (inventory.getQuantity() < item.getQuantity()) {
                throw new RuntimeException("Out of stock for product: " + item.getProduct().getName());
            }

            // Update inventory
            inventory.setQuantity(inventory.getQuantity() - item.getQuantity());
            inventoryRepository.save(inventory);

            order.getOrderDetails().add(detail);

            total = total.add(item.getProduct().getPrice().multiply(new BigDecimal(item.getQuantity())));
        }

        order.setTotalPrice(total);
        orderRepository.save(order);

        cartService.clearCart(username);

        return order;
    }
}
