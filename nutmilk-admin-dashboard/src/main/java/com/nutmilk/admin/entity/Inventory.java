package com.nutmilk.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventories")
public class Inventory extends BaseEntity {

    @Column(name = "product_id")
    private Long productId;

    private Integer quantity;

    // Use updatedAt from BaseEntity instead of custom fields

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
