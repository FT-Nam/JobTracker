package com.jobtracker.jobtracker_app.mapper;

import com.jobtracker.jobtracker_app.dto.request.UserCreationRequest;
import com.jobtracker.jobtracker_app.dto.request.UserUpdateRequest;
import com.jobtracker.jobtracker_app.dto.response.UserResponse;
import com.jobtracker.jobtracker_app.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "email", ignore = true)
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
