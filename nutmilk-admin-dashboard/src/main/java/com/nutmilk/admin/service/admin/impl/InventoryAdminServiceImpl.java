package com.nutmilk.admin.service.admin.impl;

import com.nutmilk.admin.dto.admin.InventoryResponse;
import com.nutmilk.admin.repository.KhoRepository;
import com.nutmilk.admin.service.admin.InventoryAdminService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventoryAdminServiceImpl implements InventoryAdminService {

    private final KhoRepository khoRepo;

    public InventoryAdminServiceImpl(KhoRepository khoRepo) {
        this.khoRepo = khoRepo;
    }

    @Override
    public List<InventoryResponse> getInventory() {

        List<Object[]> raw = khoRepo.getInventoryRaw();
        List<InventoryResponse> result = new ArrayList<>();

        for (Object[] row : raw) {
            InventoryResponse dto = new InventoryResponse();

            Integer maSanPham = (Integer) row[0];
            String tenSanPham = (String) row[1];
            Integer soLuongTon = (Integer) row[2];

            dto.setMaSanPham(maSanPham);
            dto.setTenSanPham(tenSanPham);
            dto.setSoLuongTon(soLuongTon);

            // logic trạng thái kho
            if (soLuongTon == 0) {
                dto.setTrangThai("HET_HANG");
            } else if (soLuongTon < 10) {
                dto.setTrangThai("SAP_HET");
            } else {
                dto.setTrangThai("CON_HANG");
            }

            result.add(dto);
        }

        return result;
    }
}
