package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.repository.AppUserRepository;
import com.example.prototypesetup.service.TokenService;
import com.example.prototypesetup.service.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;
import java.util.Collections;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AppUserRepository appUserRepository;
    
    @Autowired
    private TokenService tokenService;
    
    @Autowired
    private PasswordService passwordService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {        
        try {
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            AppUser user = appUserRepository.findByEmail(email);
            
            if (user == null) {
                return ResponseEntity.status(404).body("Account not found.");
            }

            String dbPassword = user.getPassword();
            
            if (!passwordService.verifyPassword(password, dbPassword)) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            // Create Authentication object for token generation
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                email, 
                null, 
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getRoleName()))
            );
            
            // Generate JWT token
            String token = tokenService.generateToken(authentication);
            tokenService.setTokenCookie(response, token);
            
            // Return success response without token
            return ResponseEntity.ok("Login successful");
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error has occurred.");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        tokenService.clearTokenCookie(response);
        return ResponseEntity.ok("Logout successful");
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
