package com.example.prototypesetup;

import com.example.prototypesetup.controller.UserLocationAccessController;
import com.example.prototypesetup.entity.*;
import com.example.prototypesetup.repository.*;
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

@WebMvcTest(UserLocationAccessController.class)
public class UserLocationAccessControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserLocationAccessRepository userLocationAccessRepository;

    @MockBean
    private AppUserRepository appUserRepository;

    @MockBean
    private LocationRepository locationRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private AppUser testUser;
    private Location testLocation;
    private UserLocationAccess testAccess;
    private UserLocationAccessId testId;
    
@BeforeEach
void setup() {

    testUser = AppUser.builder()
        .userId(1L)
        .fullName("John Doe")
        .email("john@example.com")
        .password("pass123")
        .role(new UserRole(1L, "USER", false, true)) // <-- dlRequired=false, isActive=true
        .build();


    testLocation = Location.builder()
            .locationId(10)
            .locationName("Downtown Rec Center")
            .build();

    testId = new UserLocationAccessId(1L, 10);

    testAccess = UserLocationAccess.builder()
            .appUser(testUser)
            .location(testLocation)
            .build();
}



    // GET ALL
    @Test
    void testGetAllUserLocationAccess() throws Exception {
        Mockito.when(userLocationAccessRepository.findAll())
                .thenReturn(Arrays.asList(testAccess));

        mockMvc.perform(get("/api/user-locations-access"))
                .andExpect(status().isOk());
    }

    // GET ID
    @Test
    void testGetUserLocationAccessById() throws Exception {
        Mockito.when(userLocationAccessRepository.findById(testId))
                .thenReturn(Optional.of(testAccess));

        mockMvc.perform(get("/api/user-locations-access/1/10"))
                .andExpect(status().isOk());
    }

    // POST
    @Test
    void testCreateUserLocationAccess() throws Exception {
        UserLocationAccessController.UserLocationCreateRequest request =
                new UserLocationAccessController.UserLocationCreateRequest();
        request.userId = 1L;
        request.locationId = 10;

        Mockito.when(appUserRepository.findById(1L))
                .thenReturn(Optional.of(testUser));

        Mockito.when(locationRepository.findById(10))
                .thenReturn(Optional.of(testLocation));

        Mockito.when(userLocationAccessRepository.existsById(testId))
                .thenReturn(false);

        Mockito.when(userLocationAccessRepository.save(Mockito.any(UserLocationAccess.class)))
                .thenReturn(testAccess);

        mockMvc.perform(post("/api/user-locations-access")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }

    // DELETE
    @Test
    void testDeleteUserLocationAccess() throws Exception {
        Mockito.when(userLocationAccessRepository.existsById(testId))
                .thenReturn(true);

        mockMvc.perform(delete("/api/user-locations-access/1/10"))
                .andExpect(status().isNoContent());
    }
}


