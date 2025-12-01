package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    //  GET all locations
    @GetMapping
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    // DTO (optional lightweight response structure)
    public static class LocationDTO {
        private Integer locationId;
        private String locationName;
        private String address;

        public LocationDTO() {}
        public LocationDTO(Integer locationId, String locationName, String address) {
            this.locationId = locationId;
            this.locationName = locationName;
            this.address = address;
        }

        public Integer getLocationId() { return locationId; }
        public String getLocationName() { return locationName; }
        public String getAddress() { return address; }

        public void setLocationId(Integer locationId) { this.locationId = locationId; }
        public void setLocationName(String locationName) { this.locationName = locationName; }
        public void setAddress(String address) { this.address = address; }
    }

    // GET single location by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationById(@PathVariable("id") Integer id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with ID " + id));

        Map<String, Object> result = new HashMap<>();
        result.put("locationId", location.getLocationId());
        result.put("locationName", location.getLocationName());
        result.put("address", location.getStreetAddress());
        result.put("city", location.getCity());
        result.put("state", location.getState());
        result.put("zipCode", location.getZipCode());

        return ResponseEntity.ok(result);
    }

    // CREATE new location
    @PostMapping
    public ResponseEntity<Location> createLocation(@RequestBody Location location) {
        if (location.getLocationName() == null || location.getLocationName().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Location name is required");
        }
        Location saved = locationRepository.save(location);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // UPDATE existing location
    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable("id") Integer id, @RequestBody Location updatedLocation) {
    Location location = locationRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with id " + id));

    location.setLocationName(updatedLocation.getLocationName());
    location.setStreetAddress(updatedLocation.getStreetAddress());
    location.setCity(updatedLocation.getCity());
    location.setState(updatedLocation.getState());
    location.setZipCode(updatedLocation.getZipCode());
    location.setContactNumber(updatedLocation.getContactNumber());

    Location savedLocation = locationRepository.save(location);
    return ResponseEntity.ok(savedLocation);
}

    // DELETE a location
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable("id") Integer id) {
        Optional<Location> optionalLocation = locationRepository.findById(id);
        if (optionalLocation.isPresent()) {
            locationRepository.delete(optionalLocation.get());
            return ResponseEntity.noContent().build();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found with ID " + id);
        }
    }
}
