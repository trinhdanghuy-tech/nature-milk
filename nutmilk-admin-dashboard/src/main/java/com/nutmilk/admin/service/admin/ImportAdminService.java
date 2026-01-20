package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.ImportRequest;
import com.nutmilk.admin.entity.ImportTicket;
import java.util.List;

public interface ImportAdminService {

    Long createImport(ImportRequest request);

    List<ImportTicket> getHistory();
}
