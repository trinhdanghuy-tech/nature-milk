package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.InventoryResponse;

import java.util.List;

public interface InventoryAdminService {

    List<InventoryResponse> getInventory();
}
