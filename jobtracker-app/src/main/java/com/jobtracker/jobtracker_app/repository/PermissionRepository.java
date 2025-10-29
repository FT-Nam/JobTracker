package com.jobtracker.jobtracker_app.repository;

import com.jobtracker.jobtracker_app.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, String> {
    Boolean existsByName(String name);
}
