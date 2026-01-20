package com.nutmilk.admin.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "import_details")
public class ImportDetail extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "import_ticket_id")
    private ImportTicket importTicket;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;

    @Column(name = "import_price")
    private BigDecimal importPrice;

    public ImportTicket getImportTicket() {
        return importTicket;
    }

    public void setImportTicket(ImportTicket importTicket) {
        this.importTicket = importTicket;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(BigDecimal importPrice) {
        this.importPrice = importPrice;
    }
}
