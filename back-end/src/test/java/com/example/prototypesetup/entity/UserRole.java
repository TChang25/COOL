package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user_role")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_role_id")
    private Long roleId;

    @Column(name = "user_role_name", nullable = false, unique = true, length = 50)
    private String roleName;

    @Column(name = "dl_required", nullable = false)
    private boolean dlRequired;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
}
