package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Location;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(LocationController.class)
public class LocationTest {

    @Autowired 
    private MockMvc mockMvc;

    @MockBean
    private LocationRepository locationRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Location testLocation;

    @BeforeEach
    public void setup() {
        testLocation = new Location();
        testLocation.setLocationId(1);
        testLocation.setLocationName("Downtown Rec Center");
        testLocation.setStreetAddress("500 S Orange Ave");
        testLocation.setCity("Orlando");
        testLocation.setState("FL");
        testLocation.setZipCode("32801");
        testLocation.setContactNumber("407-555-1234");
    }

    @Test
    public void testGetAllLocations() throws Exception {
        Mockito.when(locationRepository.findAll()).thenReturn(Arrays.asList(testLocation));

        mockMvc.perform(get("/api/locations"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].locationName").value("Downtown Rec Center"));
    }

    @Test
    public void testGetLocationById() throws Exception {
        Mockito.when(locationRepository.findById(1)).thenReturn(Optional.of(testLocation));

        mockMvc.perform(get("/api/locations/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.locationName").value("Downtown Rec Center"))
                .andExpect(jsonPath("$.city").value("Orlando"));
    }

    @Test
    public void testCreateLocation() throws Exception {
        Mockito.when(locationRepository.save(any(Location.class))).thenReturn(testLocation);

        mockMvc.perform(post("/api/locations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testLocation)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.locationName").value("Downtown Rec Center"));
    }

    @Test
    public void testUpdateLocation() throws Exception {
        Location updated = new Location();
        updated.setLocationName("Updated Name");
        updated.setStreetAddress("Updated Address");
        updated.setCity("Orlando");
        updated.setState("FL");
        updated.setZipCode("32801");
        updated.setContactNumber("407-555-1234");

        Mockito.when(locationRepository.findById(1)).thenReturn(Optional.of(testLocation));
        Mockito.when(locationRepository.save(any(Location.class))).thenReturn(updated);

        mockMvc.perform(put("/api/locations/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updated)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.locationName").value("Updated Name"));
    }

    @Test
    public void testDeleteLocation() throws Exception {
        Mockito.when(locationRepository.findById(1)).thenReturn(Optional.of(testLocation));

        mockMvc.perform(delete("/api/locations/1"))
                .andExpect(status().isNoContent());
    }
}
