package com.jobtracker.jobtracker_app.repository;

import com.jobtracker.jobtracker_app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);
}
