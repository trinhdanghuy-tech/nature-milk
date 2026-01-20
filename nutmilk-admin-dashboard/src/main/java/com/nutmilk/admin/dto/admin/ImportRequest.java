package com.nutmilk.admin.dto.admin;

import java.math.BigDecimal;
import java.util.List;

public class ImportRequest {

    private Long supplierId;
    private Long employeeId;
    private List<Item> items;

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item {
        private Long productId;
        private Integer quantity;
        private BigDecimal importPrice;

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

        public BigDecimal getImportPrice() {
            return importPrice;
        }

        public void setImportPrice(BigDecimal importPrice) {
            this.importPrice = importPrice;
        }
    }
}
