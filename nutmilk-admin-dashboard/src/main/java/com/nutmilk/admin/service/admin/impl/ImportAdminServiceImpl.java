package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.ImportRequest;
import com.nutmilk.admin.entity.*;
import com.nutmilk.admin.repository.*;
import com.nutmilk.admin.service.admin.ImportAdminService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ImportAdminServiceImpl implements ImportAdminService {

    private final ImportTicketRepository importTicketRepo;
    private final ImportDetailRepository importDetailRepo;
    private final InventoryRepository inventoryRepo;
    private final ProductRepository productRepo;

    public ImportAdminServiceImpl(
            ImportTicketRepository importTicketRepo,
            ImportDetailRepository importDetailRepo,
            InventoryRepository inventoryRepo,
            ProductRepository productRepo) {
        this.importTicketRepo = importTicketRepo;
        this.importDetailRepo = importDetailRepo;
        this.inventoryRepo = inventoryRepo;
        this.productRepo = productRepo;
    }

    @Override
    @Transactional
    public Long createImport(ImportRequest req) {

        // 1. Create Import Ticket
        ImportTicket ticket = new ImportTicket();
        ticket.setImportDate(LocalDateTime.now());
        ticket.setSupplierId(req.getSupplierId());
        ticket.setEmployeeId(req.getEmployeeId());

        ImportTicket savedTicket = importTicketRepo.save(ticket);

        // 2. Save details + update inventory
        if (req.getItems() == null || req.getItems().isEmpty()) {
            throw new RuntimeException("Import list is empty");
        }

        for (ImportRequest.Item item : req.getItems()) {

            Product product = productRepo.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + item.getProductId()));

            ImportDetail detail = new ImportDetail();
            detail.setImportTicket(savedTicket);
            detail.setProduct(product);
            detail.setQuantity(item.getQuantity());
            detail.setImportPrice(item.getImportPrice());

            importDetailRepo.save(detail);

            // Update Inventory
            Inventory inventory = inventoryRepo.findByProductId(item.getProductId())
                    .orElseGet(() -> {
                        Inventory newInv = new Inventory();
                        newInv.setProductId(item.getProductId());
                        newInv.setQuantity(0);
                        return newInv;
                    });

            inventory.setQuantity(inventory.getQuantity() + item.getQuantity());
            inventoryRepo.save(inventory);
        }

        return savedTicket.getId();
    }

    @Override
    public java.util.List<ImportTicket> getHistory() {
        return importTicketRepo.findAll(org.springframework.data.domain.Sort
                .by(org.springframework.data.domain.Sort.Direction.DESC, "importDate"));
    }
}
