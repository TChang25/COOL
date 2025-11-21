package com.example.prototypesetup.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "device_condition")
public class DeviceCondition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_condition_id")
    private Integer deviceConditionId;

    @Column(name = "device_condition_name", nullable = false, unique = true, length = 50)
    private String deviceConditionName;

    
    public DeviceCondition() {}

    public Integer getDeviceConditionId() { return deviceConditionId; }
    public void setDeviceConditionId(Integer deviceConditionId) { this.deviceConditionId = deviceConditionId; }

    public String getDeviceConditionName() { return deviceConditionName; }
    public void setDeviceConditionName(String deviceConditionName) { this.deviceConditionName = deviceConditionName; }
}
