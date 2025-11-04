package com.jobtracker.jobtracker_app.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    @Builder.Default
    Boolean success = true;
    String message;
    T data;
    List<ValidationError> errors;
    @Builder.Default
    LocalDateTime timestamp = LocalDateTime.now();
    PaginationInfo paginationInfo;
}
