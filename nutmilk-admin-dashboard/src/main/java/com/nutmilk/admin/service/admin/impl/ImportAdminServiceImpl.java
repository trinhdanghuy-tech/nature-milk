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

    private final PhieuNhapRepository phieuRepo;
    private final ChiTietPhieuNhapRepository ctRepo;
    private final KhoRepository khoRepo;

    public ImportAdminServiceImpl(
            PhieuNhapRepository phieuRepo,
            ChiTietPhieuNhapRepository ctRepo,
            KhoRepository khoRepo
    ) {
        this.phieuRepo = phieuRepo;
        this.ctRepo = ctRepo;
        this.khoRepo = khoRepo;
    }

    @Override
    @Transactional
    public Integer createImport(ImportRequest req) {

        // 1. tạo phiếu nhập
        PhieuNhapHang phieu = new PhieuNhapHang();
        phieu.setNgayNhap(LocalDateTime.now());
        phieu.setMaNhaCungCap(req.getMaNhaCungCap());
        phieu.setMaNhanVien(req.getMaNhanVien());

        PhieuNhapHang savedPhieu = phieuRepo.save(phieu);

        // 2. lưu chi tiết + cập nhật kho
        if (req.getItems() == null || req.getItems().isEmpty()) {
            throw new RuntimeException("Danh sách sản phẩm nhập kho trống");
        }
        for (ImportRequest.Item item : req.getItems()) {

            ChiTietPhieuNhap ct = new ChiTietPhieuNhap();

            ChiTietPhieuNhapId id = new ChiTietPhieuNhapId();
            id.setMaPhieuNhap(savedPhieu.getMaPhieuNhap());
            id.setMaSanPham(item.getMaSanPham());

            ct.setId(id);
            ct.setSoLuongNhap(item.getSoLuongNhap());
            ct.setGiaNhap(item.getGiaNhap());

            ctRepo.save(ct);

            ct.setSoLuongNhap(item.getSoLuongNhap());
            ct.setGiaNhap(item.getGiaNhap());
            ctRepo.save(ct);

            Kho kho = khoRepo.findByMaSanPham(item.getMaSanPham())
                    .orElseGet(() -> {
                        Kho newKho = new Kho();
                        newKho.setMaSanPham(item.getMaSanPham());
                        newKho.setSoLuongTon(0);
                        newKho.setNgayCapNhat(LocalDateTime.now());
                        return newKho;
                    });

            kho.setSoLuongTon(
                    kho.getSoLuongTon() + item.getSoLuongNhap()
            );
            kho.setNgayCapNhat(LocalDateTime.now());
            khoRepo.save(kho);
        }
    return savedPhieu.getMaPhieuNhap();
    }
}
