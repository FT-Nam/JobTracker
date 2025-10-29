package com.jobtracker.jobtracker_app.serivce;

import com.jobtracker.jobtracker_app.dto.request.RoleRequest;
import com.jobtracker.jobtracker_app.dto.response.RoleResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleService {
    RoleResponse create(RoleRequest request);
    RoleResponse getById(String id);
    Page<RoleResponse> getAll(Pageable pageable);
    RoleResponse update(String id, RoleRequest request);
    void delete(String id);
}
