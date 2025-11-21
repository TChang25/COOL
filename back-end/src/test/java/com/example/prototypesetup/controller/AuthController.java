
package com.example.prototypesetup.controller;

import com.example.prototypesetup.entity.AppUser;
import com.example.prototypesetup.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AppUserRepository appUserRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {        
        try {
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            AppUser user = appUserRepository.findByEmail(email);
            
            if (user == null) {
                return ResponseEntity.status(404).body(new ErrorResponse("Account not found."));
            }

            String dbPassword = user.getPassword();
            
            if (!password.equals(dbPassword)) {
                return ResponseEntity.status(401).body(new ErrorResponse("Invalid password"));
            }

            Long userId = user.getUserId();
            String dbEmail = user.getEmail();
            String userRole = user.getRole().getRoleName();

            UserInfo userInfo = new UserInfo(userId, dbEmail, userRole);
            SuccessResponse response = new SuccessResponse("Login successful", userInfo);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ErrorResponse("An unexpected error has occurred."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody LogoutRequest logoutRequest) {
        try {
            String email = logoutRequest.getEmail();

            // Check if user exists, might change to check active session
            AppUser user = appUserRepository.findByEmail(email);
            
            if (user == null) {
                return ResponseEntity.status(401).body(new ErrorResponse("User not logged in"));
            }

            // Add session termination
            Long userId = user.getUserId();
            String dbEmail = user.getEmail();
            String userRole = user.getRole().getRoleName();

            UserInfo userInfo = new UserInfo(userId, dbEmail, userRole);
            SuccessResponse response = new SuccessResponse("Logout successful", userInfo);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ErrorResponse("An unexpected error has occurred."));
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

    public static class ErrorResponse {
        private final String error;
        public ErrorResponse(String error) { this.error = error; }
        public String getError() { return error; }
    }

    public static class UserInfo {
        private final Long user_id;
        private final String name;
        private final String user_role;

        public UserInfo(Long user_id, String name, String user_role) {
            this.user_id = user_id;
            this.name = name;
            this.user_role = user_role;
        }
        public Long getUser_id() { return user_id; }
        public String getName() { return name; }
        public String getUser_role() { return user_role; }
    }

    public static class SuccessResponse {
        private final String message;
        private final UserInfo user;

        public SuccessResponse(String message, UserInfo user) {
            this.message = message;
            this.user = user;
        }

        public String getMessage() { return message; }
        public UserInfo getUser() { return user; }
    }
}
    