package com.jobtracker.jobtracker_app.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PartialAuditEntity extends BaseEntity{
    @Column(name = "created_by")
    @CreatedBy
    String createdBy;

    @Column(name = "is_deleted", nullable = false)
    Boolean isDeleted = false;

    // Check delete
    public boolean isDeleted() {
        return isDeleted;
    }

    // Delete
    public void softDelete() {
        this.isDeleted = true;
    }

    // Restore
    public void restore() {
        this.isDeleted = false;
    }
}
