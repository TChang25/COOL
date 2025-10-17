package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "device_type")
public class DeviceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_type_id")
    private Integer deviceTypeId;

    @Column(name = "device_type_name", nullable = false)
    private String deviceTypeName;
}
