package com.jobtracker.jobtracker_app.serivce.impl;

import com.jobtracker.jobtracker_app.dto.request.PermissionRequest;
import com.jobtracker.jobtracker_app.dto.response.PermissionResponse;
import com.jobtracker.jobtracker_app.entity.Permission;
import com.jobtracker.jobtracker_app.exception.AppException;
import com.jobtracker.jobtracker_app.exception.ErrorCode;
import com.jobtracker.jobtracker_app.mapper.PermissionMapper;
import com.jobtracker.jobtracker_app.repository.PermissionRepository;
import com.jobtracker.jobtracker_app.serivce.PermissionService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional(readOnly = true)
public class PermissionServiceImpl implements PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    @Override
    @Transactional
    public PermissionResponse create(PermissionRequest request) {
        if(permissionRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.NAME_EXISTED);
        }

        Permission permission = permissionMapper.toPermission(request);

        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    public PermissionResponse getById(String id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        return permissionMapper.toPermissionResponse(permission);
    }

    @Override
    public Page<PermissionResponse> getAll(Pageable pageable) {
        return permissionRepository.findAll(pageable).map(permissionMapper::toPermissionResponse);
    }

    @Override
    @Transactional
    public PermissionResponse update(String id, PermissionRequest request) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        if(request.getName() != null && !request.getName().equals(permission.getName())){
            if(permissionRepository.existsByName(request.getName())){
                throw new AppException(ErrorCode.NAME_EXISTED);
            }
            permission.setName(request.getName());
        }

        permissionMapper.updatePermission(permission, request);
        return permissionMapper.toPermissionResponse(permissionRepository.save(permission));
    }

    @Override
    @Transactional
    public void delete(String id) {
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));
        permission.softDelete();
        permissionRepository.save(permission);
    }
}
