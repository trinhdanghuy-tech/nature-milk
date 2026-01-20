package com.nutmilk.admin.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "import_tickets")
public class ImportTicket extends BaseEntity {

    @Column(name = "import_date")
    private LocalDateTime importDate;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "employee_id")
    private Long employeeId; // Could be a User entity relationship

    public LocalDateTime getImportDate() {
        return importDate;
    }

    public void setImportDate(LocalDateTime importDate) {
        this.importDate = importDate;
    }

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
}
