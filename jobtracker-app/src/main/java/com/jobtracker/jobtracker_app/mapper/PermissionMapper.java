package com.jobtracker.jobtracker_app.mapper;

import com.jobtracker.jobtracker_app.dto.request.PermissionRequest;
import com.jobtracker.jobtracker_app.dto.response.PermissionResponse;
import com.jobtracker.jobtracker_app.entity.Permission;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    @Mapping(target = "name", ignore = true)
    Permission toPermission(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updatePermission(@MappingTarget Permission permission, PermissionRequest request);
}
