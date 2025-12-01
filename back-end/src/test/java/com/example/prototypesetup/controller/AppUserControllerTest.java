package com.example.prototypesetup.controller;

import com.example.prototypesetup.controller.AppUserController;
import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.UserRoleRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AppUserController.class)
class AppUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AppUserRepository appUserRepository;

    @MockBean
    private UserRoleRepository userRoleRepository;

    @MockBean
    private LocationRepository locationRepository;

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
        testUser.setFullName("John Doe");
        testUser.setEmail("johnD@example.com");
        testUser.setPassword("password123");
        testUser.setRole(testRole);
    }

    @Test
    void testGetAllUsers() throws Exception {
        Mockito.when(appUserRepository.findAll()).thenReturn(Arrays.asList(testUser));
        mockMvc.perform(get("/api/app-users"))
            .andExpect(status().isOk());
    }

    @Test
    void testGetUserById() throws Exception {
        Mockito.when(appUserRepository.findById(1L)).thenReturn(Optional.of(testUser));
        mockMvc.perform(get("/api/app-users/1"))
            .andExpect(status().isOk());
    }

    @Test
    void testCreateUser() throws Exception {
        Mockito.when(userRoleRepository.findById(1L)).thenReturn(Optional.of(testRole));
        Mockito.when(appUserRepository.save(Mockito.any(AppUser.class))).thenReturn(testUser);

        mockMvc.perform(post("/api/app-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testUser)))
            .andExpect(status().isCreated());
    }

    @Test
    void testUpdateUser() throws Exception {
        Mockito.when(appUserRepository.findById(1L)).thenReturn(Optional.of(testUser));
        Mockito.when(userRoleRepository.findById(1L)).thenReturn(Optional.of(testRole));
        Mockito.when(appUserRepository.save(Mockito.any(AppUser.class))).thenReturn(testUser);

        mockMvc.perform(put("/api/app-users/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(testUser)))
            .andExpect(status().isOk());
    }

    @Test
    void testDeleteUser() throws Exception {
        Mockito.when(appUserRepository.existsById(1L)).thenReturn(true);

        mockMvc.perform(delete("/api/app-users/1"))
            .andExpect(status().isNoContent());
    }
}
