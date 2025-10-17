package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_location")
public class UserLocation {

    @EmbeddedId
    private UserLocationId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private AppUser user;

    @ManyToOne
    @MapsId("locationId")
    @JoinColumn(name = "location_id")
    private Location location;
}
