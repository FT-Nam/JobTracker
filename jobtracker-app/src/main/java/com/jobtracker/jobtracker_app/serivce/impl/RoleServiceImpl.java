package com.jobtracker.jobtracker_app.serivce.impl;

import com.jobtracker.jobtracker_app.dto.request.RoleRequest;
import com.jobtracker.jobtracker_app.dto.response.RoleResponse;
import com.jobtracker.jobtracker_app.entity.Permission;
import com.jobtracker.jobtracker_app.entity.Role;
import com.jobtracker.jobtracker_app.exception.AppException;
import com.jobtracker.jobtracker_app.exception.ErrorCode;
import com.jobtracker.jobtracker_app.mapper.RoleMapper;
import com.jobtracker.jobtracker_app.repository.PermissionRepository;
import com.jobtracker.jobtracker_app.repository.RoleRepository;
import com.jobtracker.jobtracker_app.serivce.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService {
    RoleRepository roleRepository;
    RoleMapper roleMapper;
    PermissionRepository permissionRepository;

    @Override
    @Transactional
    public RoleResponse create(RoleRequest request) {
        if(roleRepository.existsByName(request.getName())){
            throw new AppException(ErrorCode.NAME_EXISTED);
        }

        Role role = roleMapper.toRole(request);

        role.setName(request.getName());
        List<Permission> permissions = permissionRepository.findAllById(request.getPermissionIds());
        role.setPermissions(permissions);

        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    @Override
    public RoleResponse getById(String id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_EXISTED));

        return roleMapper.toRoleResponse(role);
    }

    @Override
    public Page<RoleResponse> getAll(Pageable pageable) {
        return roleRepository.findAll(pageable).map(roleMapper::toRoleResponse);
    }

    @Override
    @Transactional
    public RoleResponse update(String id, RoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        if (request.getName() != null && !request.getName().equals(role.getName())) {
            if (roleRepository.existsByName(request.getName())) {
                throw new AppException(ErrorCode.NAME_EXISTED);
            }
            role.setName(request.getName());
        }

        if(request.getPermissionIds() != null){
            List<Permission> permissions = permissionRepository.findAllById(request.getPermissionIds());
            role.setPermissions(permissions);
        }

        roleMapper.updateRole(role, request);
        return roleMapper.toRoleResponse(roleRepository.save(role));
    }

    @Override
    @Transactional
    public void delete(String id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(()-> new AppException(ErrorCode.ROLE_NOT_EXISTED));
        role.softDelete();
        roleRepository.save(role);
    }
}
