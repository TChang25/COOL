package com.example.prototypesetup.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;

    @Column(nullable = false, unique = true, length = 50)
    private String roleName;

    private boolean dlFlag;          // requires Driver’s License?
    private boolean otherPermFlag;   // extra permissions

    // Getters and setters
    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }

    public String getRoleName() { return roleName; }
    public void setRoleName(String roleName) { this.roleName = roleName; }

    public boolean isDlFlag() { return dlFlag; }
    public void setDlFlag(boolean dlFlag) { this.dlFlag = dlFlag; }

    public boolean isOtherPermFlag() { return otherPermFlag; }
    public void setOtherPermFlag(boolean otherPermFlag) { this.otherPermFlag = otherPermFlag; }
}
