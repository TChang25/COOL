package com.example.prototypesetup.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserLocationId implements Serializable {
    private Long userId;
    private Integer locationId;
}
