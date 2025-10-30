package com.jobtracker.jobtracker_app.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TokenInfo {
    String accessToken;
    String refreshToken;
    LocalDateTime expiresIn;
    LocalDateTime refreshExpiresIn;
}
