package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Device;
import com.example.prototypesetup.entity.DeviceStatus;
import com.example.prototypesetup.entity.DeviceType;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.DeviceRepository;
import com.example.prototypesetup.repository.DeviceStatusRepository;
import com.example.prototypesetup.repository.DeviceTypeRepository;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(DeviceController.class)
public class DeviceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DeviceRepository deviceRepository;

    @MockBean
    private DeviceTypeRepository deviceTypeRepository;

    @MockBean
    private DeviceStatusRepository deviceStatusRepository;

    @MockBean
    private LocationRepository locationRepository;

    @MockBean
    private AppUserRepository appUserRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Device testDevice;
    private DeviceType testType;
    private DeviceStatus testStatus;
    private Location testLocation;
    private AppUser testUser;

    @BeforeEach
    void setup() {
        testType = DeviceType.builder()
                .deviceTypeId(1)
                .deviceTypeName("Laptop")
                .build();

        testStatus = DeviceStatus.builder()
                .deviceStatusId(1)
                .statusName("Available")
                .build();

        testLocation = Location.builder()
                .locationId(1)
                .locationName("Callahan Neighborhood Center")
                .build();

        testUser = AppUser.builder()
                .userId(3L)
                .fullName("Employee NumOne")
                .email("emp1@workemail.com")
                .build();

        testDevice = Device.builder()
                .deviceId(1L)
                .deviceName("Dell Laptop Series A")
                .serialNumber("LAP-001")
                .type(testType)
                .status(testStatus)
                .location(testLocation)
                .createdBy(testUser)
                .build();
    }

    @Test
    void testGetAllDevices() throws Exception {
        Mockito.when(deviceRepository.findAll())
                .thenReturn(Arrays.asList(testDevice));

        mockMvc.perform(get("/api/devices"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].deviceName").value("Dell Laptop Series A"));
    }

    @Test
    void testGetDeviceById() throws Exception {
        Mockito.when(deviceRepository.findById(1L))
                .thenReturn(Optional.of(testDevice));

        mockMvc.perform(get("/api/devices/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.deviceName").value("Dell Laptop Series A"))
                .andExpect(jsonPath("$.status.statusName").value("Available"));
    }

    @Test
    void testGetDeviceById_NotFound() throws Exception {
        Mockito.when(deviceRepository.findById(99L))
                .thenReturn(Optional.empty());

        mockMvc.perform(get("/api/devices/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateDevice() throws Exception {
        Device createRequest = Device.builder()
                .deviceName("New Laptop")
                .serialNumber("LAP-999")
                .type(DeviceType.builder().deviceTypeId(1).build())
                .status(DeviceStatus.builder().deviceStatusId(1).build())
                .location(Location.builder().locationId(1).build())
                .createdBy(AppUser.builder().userId(3L).build())
                .build();

        Mockito.when(deviceTypeRepository.findById(1)).thenReturn(Optional.of(testType));
        Mockito.when(deviceStatusRepository.findById(1)).thenReturn(Optional.of(testStatus));
        Mockito.when(locationRepository.findById(1)).thenReturn(Optional.of(testLocation));
        Mockito.when(appUserRepository.findById(3L)).thenReturn(Optional.of(testUser));
        Mockito.when(deviceRepository.save(any(Device.class))).thenReturn(testDevice);

        mockMvc.perform(post("/api/devices")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.deviceName").value("Dell Laptop Series A"));
    }

    @Test
    void testUpdateDevice() throws Exception {
        Device updateRequest = Device.builder()
                .deviceName("Updated Laptop Name")
                .serialNumber("LAP-001") // same serial
                .type(DeviceType.builder().deviceTypeId(1).build())
                .status(DeviceStatus.builder().deviceStatusId(1).build())
                .location(Location.builder().locationId(1).build())
                .createdBy(AppUser.builder().userId(3L).build())
                .build();

        Mockito.when(deviceRepository.findById(1L))
                .thenReturn(Optional.of(testDevice));
        Mockito.when(deviceTypeRepository.findById(1)).thenReturn(Optional.of(testType));
        Mockito.when(deviceStatusRepository.findById(1)).thenReturn(Optional.of(testStatus));
        Mockito.when(locationRepository.findById(1)).thenReturn(Optional.of(testLocation));
        Mockito.when(appUserRepository.findById(3L)).thenReturn(Optional.of(testUser));

        Device updatedDevice = Device.builder()
                .deviceId(1L)
                .deviceName("Updated Laptop Name")
                .serialNumber("LAP-001")
                .type(testType)
                .status(testStatus)
                .location(testLocation)
                .createdBy(testUser)
                .build();

        Mockito.when(deviceRepository.save(any(Device.class)))
                .thenReturn(updatedDevice);

        mockMvc.perform(put("/api/devices/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.deviceName").value("Updated Laptop Name"));
    }

    @Test
    void testDeleteDevice() throws Exception {
        Mockito.when(deviceRepository.findById(1L))
                .thenReturn(Optional.of(testDevice));

        mockMvc.perform(delete("/api/devices/1"))
                .andExpect(status().isNoContent());
    }
}
