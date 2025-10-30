package com.jobtracker.jobtracker_app.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserInfo {
    String id;
    String email;
    String firstName;
    String lastName;
    String roleName;
    String avatarUrl = null;
}
