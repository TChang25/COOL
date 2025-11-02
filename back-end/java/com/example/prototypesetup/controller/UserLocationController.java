package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.entity.UserLocation;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.example.prototypesetup.repository.UserLocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/user-locations")
public class UserLocationController {

    @Autowired
    private UserLocationRepository userLocationRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all user-location links
    @GetMapping
    public List<UserLocation> getAll() {
        return userLocationRepository.findAll();
    }

    // GET one by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserLocation> getById(@PathVariable("id") Long id) {
        return userLocationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // CREATE link (pass userId + locationId) 
    @PostMapping public ResponseEntity<UserLocation> create( @RequestParam("userId") Long userId, @RequestParam("locationId") Long locationId) {
        AppUser user = appUserRepository.findById(userId).orElse(null); 
        Location location = locationRepository.findById(locationId).orElse(null); 
        
        if (user == null || location == null) { 
        return ResponseEntity.badRequest().build(); 
        } 
        
        UserLocation ul = new UserLocation(); 
        ul.setUser(user); 
        ul.setLocation(location); 
        ul.setAssignedAt(LocalDateTime.now()); 
        
        return ResponseEntity.ok(userLocationRepository.save(ul)); 
    }
    

 // UPDATE (reassign user or location)

// DTO for update request
public static class UserLocationUpdateRequest {
    public Long userId;
    public Long locationId;
}

@PutMapping("/{id}")
public ResponseEntity<UserLocation> update(
        @PathVariable("id") Long id,
        @RequestBody UserLocationUpdateRequest request) {

    Optional<UserLocation> optionalUL = userLocationRepository.findById(id);
    if (!optionalUL.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    AppUser user = appUserRepository.findById(request.userId).orElse(null);
    Location location = locationRepository.findById(request.locationId).orElse(null);

    if (user == null || location == null) {
        return ResponseEntity.badRequest().build();
    }

    UserLocation ul = optionalUL.get();
    ul.setUser(user);
    ul.setLocation(location);
    ul.setAssignedAt(LocalDateTime.now());

    return ResponseEntity.ok(userLocationRepository.save(ul));
}


  // DELETE link
@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
    Optional<UserLocation> optionalUL = userLocationRepository.findById(id);

    if (optionalUL.isPresent()) {
        userLocationRepository.delete(optionalUL.get());
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
    }
}

}
