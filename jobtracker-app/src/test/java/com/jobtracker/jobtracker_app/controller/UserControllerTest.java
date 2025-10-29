//package com.jobtracker.jobtracker_app.controller;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.jobtracker.jobtracker_app.dto.request.UserCreationRequest;
//import com.jobtracker.jobtracker_app.dto.request.UserUpdateRequest;
//import com.jobtracker.jobtracker_app.dto.response.UserResponse;
//import com.jobtracker.jobtracker_app.entity.Role;
//import com.jobtracker.jobtracker_app.serivce.impl.UserServiceImpl;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.hamcrest.Matchers.is;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(UserController.class)
//public class UserControllerTest {
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Mock
//    private UserServiceImpl userService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    private UserResponse response;
//    private UserCreationRequest creationRequest;
//    private UserUpdateRequest updateRequest;
//    private Role role;
//
//    @BeforeEach
//    void setup(){
//        role = Role.builder()
//                .id("role1")
//                .name("role")
//                .build();
//
//        creationRequest = UserCreationRequest.builder()
//                .email("user1@gmail.com")
//                .firstName("Nam")
//                .lastName("Phan")
//                .password("123456")
//                .roleId("role1")
//                .build();
//
//        updateRequest = UserUpdateRequest.builder()
//                .firstName("Nam1")
//                .build();
//
//        response = UserResponse.builder()
//                .id("user1")
//                .email("user1@gmail.com")
//                .firstName("Nam")
//                .lastName("Phan")
//                .role(role)
//                .build();
//    }
//
//    @Test
//    void create_shouldReturnCreateUser() throws Exception {
//        when(userService.create(any())).thenReturn(response);
//
//        mockMvc.perform(post("/")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content(objectMapper.writeValueAsString(creationRequest)))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.data.email", is("user1@gmail.com")))
//                .andExpect(jsonPath("$.message", is("User create successfully")));
//    }
//
//}
