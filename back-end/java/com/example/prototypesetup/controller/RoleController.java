package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.Role;
import com.example.prototypesetup.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleRepository roleRepository;

    // GET all roles
    @GetMapping
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // GET role by ID safely
    @GetMapping("/{id}")
    public ResponseEntity<?> getRoleById(@PathVariable("id") Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

        Map<String, Object> result = new HashMap<>();
        result.put("roleId", role.getRoleId());
        result.put("roleName", role.getRoleName());

        return ResponseEntity.ok(result);
    }

    // CREATE role
    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleRepository.save(role);
    }

    // UPDATE role
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(@PathVariable("id") Long id, @RequestBody Role updatedRole) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));

        role.setRoleName(updatedRole.getRoleName());
        roleRepository.save(role);

        Map<String, Object> result = new HashMap<>();
        result.put("roleId", role.getRoleId());
        result.put("roleName", role.getRoleName());

        return ResponseEntity.ok(result);
    }

    // DELETE role safely
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable("id") Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Role not found with id " + id));



        roleRepository.delete(role);
        return ResponseEntity.noContent().build();
    }
}
