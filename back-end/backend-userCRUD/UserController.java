package com.COOL.userapi;

import org.springframework.web.bind.annotation.*;
import com.COOL.userapi.User;
import com.COOL.userapi.UserRepository;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    // Spring will automatically inject the repository
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // Get a single user by ID
    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        return userRepository.findById(id);
    }

    // Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Delete a user by ID
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return "User deleted successfully.";
    }
}