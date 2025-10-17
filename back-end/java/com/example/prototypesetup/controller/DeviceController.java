package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Device;
import com.example.prototypesetup.entity.DeviceStatus;
import com.example.prototypesetup.entity.DeviceType;
import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.repository.DeviceRepository;
import com.example.prototypesetup.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.prototypesetup.repository.DeviceTypeRepository;
import com.example.prototypesetup.repository.DeviceStatusRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/devices")
public class DeviceController {

//Class setup / Autowired fields
@Autowired
private DeviceRepository deviceRepository;

@Autowired
private AppUserRepository appUserRepository;


@Autowired
private DeviceTypeRepository deviceTypeRepository;

@Autowired
private DeviceStatusRepository deviceStatusRepository;



    //GET all devices 
    @GetMapping
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    //GET device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") Long id) {
        return deviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //POST
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
    // Validate createdBy user
    if (device.getCreatedBy() != null) {
    Optional<AppUser> user = appUserRepository.findById(device.getCreatedBy().getUserId());
    if (!user.isPresent()) {
        return ResponseEntity.badRequest().build();
    }
    device.setCreatedBy(user.get());
    }

    // Validate DeviceType
    if (device.getType() != null) {
    Optional<DeviceType> type = deviceTypeRepository.findById(device.getType().getDeviceTypeId());
    if (!type.isPresent()) return ResponseEntity.badRequest().build();
    device.setType(type.get());
    }

    // Validate DeviceStatus
    if (device.getStatus() != null) {
    Optional<DeviceStatus> status = deviceStatusRepository.findById(device.getStatus().getDeviceStatusId());
    if (!status.isPresent()) return ResponseEntity.badRequest().build();
    device.setStatus(status.get());
    }

    Device savedDevice = deviceRepository.save(device);
    return ResponseEntity.ok(savedDevice);
}

    //PUT - Update existing device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(
        @PathVariable("id") Long id,
        @RequestBody Device updatedDevice) {

    Device device = deviceRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found"));

    // Update name & serial number
    if (updatedDevice.getDeviceName() != null) device.setDeviceName(updatedDevice.getDeviceName());
    if (updatedDevice.getSerialNumber() != null) device.setSerialNumber(updatedDevice.getSerialNumber());

    // Update DeviceType
    if (updatedDevice.getType() != null) {
        DeviceType type = deviceTypeRepository
            .findById(updatedDevice.getType().getDeviceTypeId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceType ID"));
        device.setType(type);
    }

    // Update DeviceStatus
    if (updatedDevice.getStatus() != null) {
        DeviceStatus status = deviceStatusRepository
            .findById(updatedDevice.getStatus().getDeviceStatusId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceStatus ID"));
        device.setStatus(status);
    }

    // Update location
    if (updatedDevice.getLocation() != null) {
        device.setLocation(updatedDevice.getLocation());
    }

    // Update createdBy user
    if (updatedDevice.getCreatedBy() != null) {
        AppUser user = appUserRepository
            .findById(updatedDevice.getCreatedBy().getUserId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid User ID"));
        device.setCreatedBy(user);
    }

    return ResponseEntity.ok(deviceRepository.save(device));
}


    //DELETE - Remove device by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable("id") Long id) {
        Optional<Device> optionalDevice = deviceRepository.findById(id);
        if (optionalDevice.isPresent()) {
            deviceRepository.delete(optionalDevice.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
