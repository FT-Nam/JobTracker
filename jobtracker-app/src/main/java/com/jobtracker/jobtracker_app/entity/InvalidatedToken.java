package com.jobtracker.jobtracker_app.entity;

import com.jobtracker.jobtracker_app.entity.base.FullAuditEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Table(name = "invalidated_token")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class InvalidatedToken extends FullAuditEntity {
    @Id
    String id;

    Date expiryTime;
}
