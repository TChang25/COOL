package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.*;
import com.example.prototypesetup.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/app-users")
public class AppUserController {

    @Autowired
    private LocationRepository locationRepository;


    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    // GET all users
    @GetMapping
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    // GET by ID
    @GetMapping("/{id}")
    public ResponseEntity<AppUser> getUserById(@PathVariable("id") Long id) {
        return appUserRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID " + id));
    }

   // CREATE user
@PostMapping
public ResponseEntity<AppUser> createUser(@RequestBody AppUser user) {
    // Validate role
    if (user.getRole() == null || user.getRole().getRoleId() == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User role is required");
    }

    // Fetch the actual role from DB
    UserRole role = userRoleRepository.findById(user.getRole().getRoleId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found"));
    user.setRole(role);

    // Handle location access
    if (user.getLocationAccess() != null) {
        user.getLocationAccess().forEach(access -> {
            access.setAppUser(user); // set the parent

            Integer locId = access.getLocation().getLocationId();
            Location location = locationRepository.findById(locId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found: " + locId));
            access.setLocation(location);
        });
    }

    // Save user with locations
    AppUser savedUser = appUserRepository.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
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

            AppUser savedUser = appUserRepository.save(user);
            return ResponseEntity.ok(savedUser);
        }).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID " + id));
    }

    // DELETE user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        if (!appUserRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with ID " + id);
        }
        appUserRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
