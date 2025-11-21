package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.*;
import com.example.prototypesetup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

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

    @Autowired
    private LocationRepository locationRepository;

    // GET all devices
    @GetMapping
    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    // GET device by ID
    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable("id") Long id) {
        return deviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found with ID " + id));
    }

    // POST - Create new device
    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        // Validate relationships
        if (device.getType() != null) {
            DeviceType type = deviceTypeRepository.findById(device.getType().getDeviceTypeId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceType ID"));
            device.setType(type);
        }

        if (device.getStatus() != null) {
            DeviceStatus status = deviceStatusRepository.findById(device.getStatus().getDeviceStatusId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceStatus ID"));
            device.setStatus(status);
        }

        if (device.getLocation() != null) {
            Location location = locationRepository.findById(device.getLocation().getLocationId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Location ID"));
            device.setLocation(location);
        }

        if (device.getCreatedBy() != null) {
            AppUser user = appUserRepository.findById(device.getCreatedBy().getUserId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid User ID"));
            device.setCreatedBy(user);
        }

        Device savedDevice = deviceRepository.save(device);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedDevice);
    }

    // PUT - Update existing device
    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable("id") Long id, @RequestBody Device updatedDevice) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found with ID " + id));

        if (updatedDevice.getDeviceName() != null)
            device.setDeviceName(updatedDevice.getDeviceName());
        if (updatedDevice.getSerialNumber() != null)
            device.setSerialNumber(updatedDevice.getSerialNumber());

        if (updatedDevice.getType() != null) {
            DeviceType type = deviceTypeRepository.findById(updatedDevice.getType().getDeviceTypeId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceType ID"));
            device.setType(type);
        }

        if (updatedDevice.getStatus() != null) {
            DeviceStatus status = deviceStatusRepository.findById(updatedDevice.getStatus().getDeviceStatusId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid DeviceStatus ID"));
            device.setStatus(status);
        }

        if (updatedDevice.getLocation() != null) {
            Location location = locationRepository.findById(updatedDevice.getLocation().getLocationId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Location ID"));
            device.setLocation(location);
        }

        if (updatedDevice.getCreatedBy() != null) {
            AppUser user = appUserRepository.findById(updatedDevice.getCreatedBy().getUserId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid User ID"));
            device.setCreatedBy(user);
        }

        Device saved = deviceRepository.save(device);
        return ResponseEntity.ok(saved);
    }

    // DELETE - Remove a device
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable("id") Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found with ID " + id));
        deviceRepository.delete(device);
        return ResponseEntity.noContent().build();
    }
}
