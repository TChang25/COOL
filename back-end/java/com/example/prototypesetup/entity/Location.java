package com.example.prototypesetup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "location")
public class Location {

      @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Integer locationId;

    @Column(name = "location_name", nullable = false)
    private String locationName;

    @Column(name = "street_address")
    private String streetAddress;

    @Column(name = "city")
    private String city;

    @Column(name = "state", length = 2)
    private String state;

    @Column(name = "zip_code", length = 10)
    private String zipCode;

    @Column(name = "contact_number", length = 20)
    private String contactNumber;

       @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Prevent infinite recursion when serializing
    @ManyToMany(mappedBy = "locations")
    @JsonIgnore
    private Set<AppUser> users = new HashSet<>();

}
