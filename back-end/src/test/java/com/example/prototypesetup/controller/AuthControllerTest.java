package com.example.prototypesetup.controller;

import com.example.prototypesetup.controller.AuthController;
import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.AppUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppUserRepository appUserRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private AppUser testUser;
    private UserRole testRole;

    @BeforeEach
    void setup() {
        testRole = new UserRole();
        testRole.setRoleId(1L);
        testRole.setRoleName("USER");

        testUser = new AppUser();
        testUser.setUserId(1L);
        testUser.setEmail("testUser@example.com");
        testUser.setPassword("password123");
        testUser.setRole(testRole);
    }

    @Test
    void testLogin_Success() throws Exception {
        AuthController.LoginRequest loginRequest = new AuthController.LoginRequest();
        loginRequest.setEmail("testUser@example.com");
        loginRequest.setPassword("password123");

        Mockito.when(appUserRepository.findByEmail("testUser@example.com")).thenReturn(testUser);

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk());
    }

    @Test
    void testLogout_Success() throws Exception {
        AuthController.LogoutRequest logoutRequest = new AuthController.LogoutRequest();
        logoutRequest.setEmail("testUser@example.com");

        Mockito.when(appUserRepository.findByEmail("testUser@example.com")).thenReturn(testUser);

        mockMvc.perform(post("/api/auth/logout")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(logoutRequest)))
                .andExpect(status().isOk());
    }
}