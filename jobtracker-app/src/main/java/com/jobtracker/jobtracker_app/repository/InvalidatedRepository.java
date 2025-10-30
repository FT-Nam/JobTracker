package com.jobtracker.jobtracker_app.repository;

import com.jobtracker.jobtracker_app.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvalidatedRepository extends JpaRepository<InvalidatedToken, String> {
}
