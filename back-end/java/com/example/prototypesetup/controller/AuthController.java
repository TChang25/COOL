package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AppUserRepository appUserRepository;
    
    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {        
        try {
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            AppUser user = appUserRepository.findByEmail(email);
            
            if (user == null) {
                return ResponseEntity.status(404).body("Account not found.");
            }

            String dbPassword = user.getPassword();
            
            if (!password.equals(dbPassword)) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            // Create Authentication object for token generation
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                email, 
                null, 
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().getRoleName()))
            );
            
            // Generate JWT token
            String token = tokenService.generateToken(authentication);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("userId", user.getUserId());
            response.put("email", user.getEmail());
            response.put("role", user.getRole().getRoleName());
            response.put("token", token);

            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error has occurred.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) {
        try {
            String email = logoutRequest.getEmail();

            AppUser user = appUserRepository.findByEmail(email);
            
            if (user == null) {
                return ResponseEntity.status(401).body("User not logged in");
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Logout successful");
            response.put("userId", user.getUserId());
            response.put("role", user.getRole().getRoleName());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error has occurred.");
        }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LogoutRequest {
        private String email;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}
