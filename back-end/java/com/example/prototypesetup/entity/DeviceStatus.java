package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "device_status")
public class DeviceStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_status_id")
    private Integer deviceStatusId;

    @Column(name = "status_name", nullable = false)
    private String statusName;
}
