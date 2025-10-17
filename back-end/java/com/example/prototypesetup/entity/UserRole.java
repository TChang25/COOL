package com.example.prototypesetup.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_role") // matches your SQL table
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

    // Getters and setters
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public boolean isDlRequired() { return dlRequired; }
    public void setDlRequired(boolean dlRequired) { this.dlRequired = dlRequired; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}
