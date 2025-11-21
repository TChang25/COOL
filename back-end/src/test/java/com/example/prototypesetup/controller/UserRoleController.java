package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/user_role")
public class UserRoleController {

    @Autowired
    private UserRoleRepository roleRepository;

    // GET all roles
    @GetMapping
    public List<UserRole> getAllRoles() {
        return roleRepository.findAll();
    }

    // GET role by ID
    @GetMapping("/{id}")
public ResponseEntity<UserRole> getRoleById(@PathVariable("id") Long id) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with ID " + id));
    return ResponseEntity.ok(role);
}


    // CREATE new role
    @PostMapping
    public ResponseEntity<UserRole> createRole(@RequestBody UserRole role) {
        if (role.getRoleName() == null || role.getRoleName().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Role name cannot be empty");
        }

        UserRole savedRole = roleRepository.save(role);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRole);
    }

    // UPDATE existing role
@PatchMapping("/{id}")
public ResponseEntity<UserRole> updateRole(@PathVariable("id") Long id,
                                           @RequestBody UserRole updatedRole) {
    return roleRepository.findById(id).map(role -> {
        role.setRoleName(updatedRole.getRoleName());
        role.setDlRequired(updatedRole.isDlRequired());
        role.setActive(updatedRole.isActive());

        UserRole savedRole = roleRepository.save(role);
        return ResponseEntity.ok(savedRole);
    }).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with ID " + id));
}


   // DELETE role
@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteRole(@PathVariable("id") Long id) {
    if (!roleRepository.existsById(id)) {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with ID " + id);
    }

    roleRepository.deleteById(id);
    return ResponseEntity.noContent().build();
}

}
