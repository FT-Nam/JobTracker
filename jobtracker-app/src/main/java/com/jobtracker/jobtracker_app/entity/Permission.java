package com.jobtracker.jobtracker_app.entity;

import com.jobtracker.jobtracker_app.entity.base.FullAuditEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;


@Entity
@Table(name = "permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Permission extends FullAuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(length = 50, unique = true, nullable = false)
    String name;

    @Column(length = 100, nullable = false)
    String resource;

    @Column(length = 50, nullable = false)
    String action;

    String description;

    @Column(name = "is_active")
    Boolean isActive = true;
}
