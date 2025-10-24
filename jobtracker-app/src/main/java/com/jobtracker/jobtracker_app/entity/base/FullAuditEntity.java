package com.jobtracker.jobtracker_app.entity.base;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FullAuditEntity extends BaseEntity{
    @Column(name = "created_by")
    @CreatedBy
    String createdBy;

    @Column(name = "updated_by")
    @LastModifiedBy
    String updatedBy;

    @Column(name = "deleted_at")
    LocalDateTime deletedAt;

    // Check delete
    public boolean isDeleted() {
        return deletedAt != null;
    }

    // Delete
    public void softDelete() {
        this.deletedAt = LocalDateTime.now();
    }

    // Restore
    public void restore() {
        this.deletedAt = null;
    }
}
