package com.example.prototypesetup.entity;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_location")
public class UserLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userLocationId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    private LocalDateTime assignedAt = LocalDateTime.now();

    // Getters and setters
    public Long getUserLocationId() { return userLocationId; }
    public void setUserLocationId(Long userLocationId) { this.userLocationId = userLocationId; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public LocalDateTime getAssignedAt() { return assignedAt; }
    public void setAssignedAt(LocalDateTime assignedAt) { this.assignedAt = assignedAt; }
}
