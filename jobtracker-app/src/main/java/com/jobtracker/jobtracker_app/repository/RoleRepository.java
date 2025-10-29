package com.jobtracker.jobtracker_app.repository;

import com.jobtracker.jobtracker_app.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
    Boolean existsByName(String name);
}
