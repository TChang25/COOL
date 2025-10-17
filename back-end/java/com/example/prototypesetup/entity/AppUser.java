package com.example.prototypesetup.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "app_user")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "app_user_id")
    private Long userId;

    @Column(name = "app_user_full_name", nullable = false, length = 100)
    private String fullName;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String password;

    @ManyToOne
    @JoinColumn(name = "user_role_id", nullable = false)
    private UserRole role;

    // Citizen-specific fields
    @Column(name = "dl_num", length = 50)
    private String dlNum;

    @Column(name = "dl_state", length = 2)
    private String dlState;

    @Column(name = "street_address", length = 255)
    private String streetAddress;

    @Column(length = 100)
    private String city;

    @Column(length = 2)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
        name = "user_location",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    
    @JsonBackReference
    private Set<Location> locations = new HashSet<>();
}
