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
@Table(name = "device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_id")
    private Long deviceId;

    @Column(name = "device_name", nullable = false)
    private String deviceName;

    @Column(name = "serial_number", nullable = false)
    private String serialNumber;

    @ManyToOne
    @JoinColumn(name = "device_type_id", nullable = false)
    private DeviceType type;

    @ManyToOne
    @JoinColumn(name = "device_status_id", nullable = false)
    private DeviceStatus status;

    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private AppUser createdBy;

    @Column(name = "created_at", insertable = false, updatable = false)
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private java.time.LocalDateTime updatedAt;

    @Override
    public String toString() {
        return "Device{" +
                "deviceId=" + deviceId +
                ", deviceName='" + deviceName + '\'' +
                ", type=" + (type != null ? type.getDeviceTypeName() : "null") +
                ", status=" + (status != null ? status.getStatusName() : "null") +
                ", location=" + (location != null ? location.getLocationName() : "null") +
                ", createdBy=" + (createdBy != null ? createdBy.getFullName() : "null") +
                '}';
    }
}


