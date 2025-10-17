package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.entity.Location;
import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.repository.LocationRepository;
import com.example.prototypesetup.repository.UserRoleRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/app-users")
public class AppUserController {

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private LocationRepository locationRepository;

    // GET all users
    @GetMapping
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    //GET selected
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable("id") Long id) {
    return appUserRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // CREATE user
   @PostMapping
    public AppUser createUser(@RequestBody AppUser user) {

    // Set role
    UserRole role = userRoleRepository.findById(user.getRole().getRoleId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));

    user.setRole(role);

    // Set locations
    if (user.getLocations() != null && !user.getLocations().isEmpty()) {
    Set<Location> savedLocations = user.getLocations().stream()
        .map(loc -> locationRepository.findById(loc.getLocationId())
            .orElseThrow(() -> new RuntimeException("Location not found with id: " + loc.getLocationId())))
        .collect(Collectors.toSet());
    user.setLocations(savedLocations);
    }

    // Map password to password_hash
    user.setPassword(user.getPassword()); // <- this sets the DB field
    return appUserRepository.save(user);
    }

   // UPDATE user
    @PutMapping("/{id}")
    public ResponseEntity<AppUser> updateUser(@PathVariable("id") Long id, @RequestBody AppUser updatedUser) {
    return appUserRepository.findById(id).map(user -> {
        user.setFullName(updatedUser.getFullName());
        user.setEmail(updatedUser.getEmail());
        user.setPassword(updatedUser.getPassword());
        user.setStreetAddress(updatedUser.getStreetAddress());
        user.setCity(updatedUser.getCity());
        user.setState(updatedUser.getState());
        user.setZipCode(updatedUser.getZipCode());
        user.setContactNumber(updatedUser.getContactNumber());
        user.setDlNum(updatedUser.getDlNum());
        user.setDlState(updatedUser.getDlState());
        user.setDateOfBirth(updatedUser.getDateOfBirth());

        if (updatedUser.getRole() != null) {
    UserRole role = userRoleRepository.findById(updatedUser.getRole().getRoleId())
    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    user.setRole(role);
    }

    if (updatedUser.getLocations() != null) {
    Set<Location> updatedLocations = updatedUser.getLocations().stream()
        .map(loc -> locationRepository.findById(loc.getLocationId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found")))
        .collect(Collectors.toSet());
    user.setLocations(updatedLocations);
    }

        AppUser savedUser = appUserRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
    if (appUserRepository.existsById(id)) {
        appUserRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    } else {
        return ResponseEntity.notFound().build();
        }
    }
}
