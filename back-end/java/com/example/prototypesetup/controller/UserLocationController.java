package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.UserLocation;
import com.example.prototypesetup.entity.UserLocationId;
import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.repository.UserLocationRepository;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user-locations")
public class UserLocationController {

    @Autowired
    private UserLocationRepository userLocationRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all
    @GetMapping
    public List<UserLocation> getAllUserLocations() {
        return userLocationRepository.findAll();
    }

   // GET one by composite key
    @GetMapping("/{userId}/{locationId}")
    public ResponseEntity<UserLocation> getById(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationId id = new UserLocationId();
    id.setUserId(userId);       // match your UserLocationId field names
    id.setLocationId(locationId);

    return userLocationRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }


    // POST (create new association)
    @PostMapping
    public ResponseEntity<UserLocation> createUserLocation(@RequestBody UserLocation userLocation) {
        Optional<AppUser> user = appUserRepository.findById(userLocation.getUser().getUserId());
        Optional<Location> location = locationRepository.findById(userLocation.getLocation().getLocationId());

        if (!user.isPresent() || !location.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        userLocation.setUser(user.get());
        userLocation.setLocation(location.get());
        userLocation.setId(new UserLocationId(user.get().getUserId(), location.get().getLocationId()));

        return ResponseEntity.ok(userLocationRepository.save(userLocation));
    }


    // DELETE user-location link
    @DeleteMapping("/{userId}/{locationId}")
    public ResponseEntity<Void> deleteUserLocation(
        @PathVariable("userId") Long userId,
        @PathVariable("locationId") Integer locationId) {

    UserLocationId id = new UserLocationId(userId, locationId);

    if (userLocationRepository.existsById(id)) {
        userLocationRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    } else {
        return ResponseEntity.notFound().build(); // 404
        }
    }

}
