package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.InventoryResponse;
import com.nutmilk.admin.entity.Inventory;
import com.nutmilk.admin.entity.Product;
import com.nutmilk.admin.repository.InventoryRepository;
import com.nutmilk.admin.repository.ProductRepository;
import com.nutmilk.admin.service.admin.InventoryAdminService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InventoryAdminServiceImpl implements InventoryAdminService {

    private final InventoryRepository inventoryRepo;
    private final ProductRepository productRepo;

    public InventoryAdminServiceImpl(InventoryRepository inventoryRepo, ProductRepository productRepo) {
        this.inventoryRepo = inventoryRepo;
        this.productRepo = productRepo;
    }

    @Override
    public List<InventoryResponse> getInventory() {
        List<Inventory> inventories = inventoryRepo.findAll();
        List<Product> products = productRepo.findAll();

        Map<Long, Product> productMap = products.stream()
                .collect(Collectors.toMap(Product::getId, p -> p));

        List<InventoryResponse> result = new ArrayList<>();

        for (Inventory inv : inventories) {
            Product p = productMap.get(inv.getProductId());
            if (p == null)
                continue;

            InventoryResponse dto = new InventoryResponse();
            dto.setProductId(p.getId());
            dto.setProductName(p.getName());
            dto.setQuantity(inv.getQuantity());

            if (inv.getQuantity() <= 0) {
                dto.setStatus("OUT_OF_STOCK");
            } else if (inv.getQuantity() < 10) {
                dto.setStatus("LOW_STOCK");
            } else {
                dto.setStatus("IN_STOCK");
            }

            result.add(dto);
        }

        return result;
    }
}
