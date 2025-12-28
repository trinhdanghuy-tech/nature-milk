package com.nutmilk.admin.service.admin;

import com.nutmilk.admin.dto.admin.ImportRequest;

public interface ImportAdminService {

    Integer createImport(ImportRequest request);
}
