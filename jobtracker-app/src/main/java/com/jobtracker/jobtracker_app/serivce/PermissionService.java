package com.jobtracker.jobtracker_app.serivce;

import com.jobtracker.jobtracker_app.dto.request.PermissionRequest;
import com.jobtracker.jobtracker_app.dto.request.RoleRequest;
import com.jobtracker.jobtracker_app.dto.response.PermissionResponse;
import com.jobtracker.jobtracker_app.dto.response.RoleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PermissionService {
    PermissionResponse create(PermissionRequest request);
    PermissionResponse getById(String id);
    Page<PermissionResponse> getAll(Pageable pageable);
    PermissionResponse update(String id, PermissionRequest request);
    void delete(String id);
}
