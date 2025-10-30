package com.jobtracker.jobtracker_app.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    UserInfo user;
    TokenInfo tokens;
}
