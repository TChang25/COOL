package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.UserRole;
import com.example.prototypesetup.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user-roles")
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
    public ResponseEntity<?> getRoleById(@PathVariable(name = "id") Long id) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

    Map<String, Object> result = new HashMap<>();
    result.put("roleId", role.getRoleId());
    result.put("roleName", role.getRoleName());

    return ResponseEntity.ok(result);
    }


    // CREATE role
    @PostMapping
    public UserRole createRole(@RequestBody UserRole role) {
        return roleRepository.save(role);
    }

     // UPDATE role
    @PutMapping("/{id}")
    public UserRole updateRole(@PathVariable("id") Long id, @RequestBody UserRole updatedRole) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

    role.setRoleName(updatedRole.getRoleName());
    role.setDlRequired(updatedRole.isDlRequired());
    role.setActive(updatedRole.isActive());

    return roleRepository.save(role);
    }


    // DELETE role
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") Long id) {
    UserRole role = roleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

    roleRepository.delete(role);
    return ResponseEntity.noContent().build();
    }

}
