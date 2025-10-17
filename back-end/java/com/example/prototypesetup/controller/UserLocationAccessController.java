package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.entity.UserLocationAccess;
import com.example.prototypesetup.entity.UserLocationAccessId;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.example.prototypesetup.repository.UserLocationAccessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.util.List;

@RestController
@RequestMapping("/api/user-locations-access")
public class UserLocationAccessController {

    @Autowired
    private UserLocationAccessRepository userLocationRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all user-location links
    @GetMapping
    public List<UserLocationAccess> getAll() {
        return userLocationRepository.findAll();
    }

    // GET one by ID
   // GET one by ID
    @GetMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocationAccess> getById(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationAccessId id = new UserLocationAccessId(userId, locationId);
    return userLocationRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // DTO for create request
    public static class UserLocationCreateRequest {
    public Long userId;
    public Integer locationId;
    }

    // POST
    @PostMapping
    public ResponseEntity<UserLocationAccess> create(@RequestBody UserLocationCreateRequest request) {
    AppUser user = appUserRepository.findById(request.userId).orElse(null);
    Location location = locationRepository.findById(request.locationId).orElse(null);

    if (user == null || location == null) {
        return ResponseEntity.badRequest().build();
    }

    UserLocationAccess ul = new UserLocationAccess();
    ul.setAppUser(user);
    ul.setLocation(location);

    return ResponseEntity.ok(userLocationRepository.save(ul));
    }

    // DTO for update request
    public static class UserLocationUpdateRequest {
    public Long newUserId;
    public Integer newLocationId;
    }

    // UPDATE (reassign user or location)
    @PutMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocationAccess> update(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId,
        @RequestBody UserLocationUpdateRequest request) {

    UserLocationAccessId oldId = new UserLocationAccessId(userId, locationId);
    Optional<UserLocationAccess> optionalUL = userLocationRepository.findById(oldId);

    //if not found = return 404
    if (!optionalUL.isPresent()) {
        return ResponseEntity.notFound().build();
    }

    // update existing
    UserLocationAccess ul = optionalUL.get();

    if (request.newUserId != null) {
        AppUser newUser = appUserRepository.findById(request.newUserId).orElse(null);
        if (newUser == null) return ResponseEntity.badRequest().build();
        ul.setAppUser(newUser);
    }

    if (request.newLocationId != null) {
        Location newLocation = locationRepository.findById(request.newLocationId).orElse(null);
        if (newLocation == null) return ResponseEntity.badRequest().build();
        ul.setLocation(newLocation);
    }

    // save and return updated relationship
    UserLocationAccess updated = userLocationRepository.save(ul);
    return ResponseEntity.ok(updated);
    }

     // DELETE link
    @DeleteMapping("/{userId}/{locationId}")
    public ResponseEntity<Void> deleteUserLocation(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationAccessId id = new UserLocationAccessId(userId, locationId);

    if (userLocationRepository.existsById(id)) {
        userLocationRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
        }
    }

}
