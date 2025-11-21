package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.*;
import com.example.prototypesetup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-locations-access")
public class UserLocationAccessController {

    @Autowired
    private UserLocationAccessRepository userLocationAccessRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all user-location links
    @GetMapping
    public List<UserLocationAccess> getAll() {
        return userLocationAccessRepository.findAll();
    }

    // GET specific user-location link
   @GetMapping("/{userId}/{locationId}")
public ResponseEntity<UserLocationAccess> getById(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationAccessId id = new UserLocationAccessId(userId, locationId);
    return userLocationAccessRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "User-location access not found for User ID " + userId + " and Location ID " + locationId
            ));
}


    // DTO for POST
    public static class UserLocationCreateRequest {
        public Long userId;
        public Integer locationId;
    }

    // POST - Create new link
    @PostMapping
    public ResponseEntity<UserLocationAccess> create(@RequestBody UserLocationCreateRequest request) {
        if (request.userId == null || request.locationId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Both userId and locationId are required.");
        }

        AppUser user = appUserRepository.findById(request.userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid User ID."));
        Location location = locationRepository.findById(request.locationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid Location ID."));

        UserLocationAccessId id = new UserLocationAccessId(request.userId, request.locationId);
        if (userLocationAccessRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Access link already exists for this user and location.");
        }

        UserLocationAccess newAccess = UserLocationAccess.builder()
                .appUser(user)
                .location(location)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userLocationAccessRepository.save(newAccess));
    }

    // PUT - Update relationship (change linked user or location)
    public static class UserLocationUpdateRequest {
        public Long newUserId;
        public Integer newLocationId;
    }

    @PutMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocationAccess> update(
            @PathVariable Long userId,
            @PathVariable Integer locationId,
            @RequestBody UserLocationUpdateRequest request) {

        UserLocationAccessId oldId = new UserLocationAccessId(userId, locationId);
        UserLocationAccess existing = userLocationAccessRepository.findById(oldId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "UserLocationAccess not found."));

        if (request.newUserId != null) {
            AppUser newUser = appUserRepository.findById(request.newUserId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid new User ID."));
            existing.setAppUser(newUser);
        }

        if (request.newLocationId != null) {
            Location newLocation = locationRepository.findById(request.newLocationId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid new Location ID."));
            existing.setLocation(newLocation);
        }

        // Delete old composite key record and create a new one if IDs changed
        userLocationAccessRepository.deleteById(oldId);
        UserLocationAccess updated = userLocationAccessRepository.save(existing);

        return ResponseEntity.ok(updated);
    }

    /// DELETE - Remove access link
@DeleteMapping("/{userId}/{locationId}")
public ResponseEntity<Void> delete(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationAccessId id = new UserLocationAccessId(userId, locationId);

    if (!userLocationAccessRepository.existsById(id)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "User-location access not found for User ID " + userId + " and Location ID " + locationId);
    }

    userLocationAccessRepository.deleteById(id);
    return ResponseEntity.noContent().build();
}

}
