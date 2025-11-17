package com.example.prototypesetup.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    @Column(name = "device_type_name", nullable = false, unique = true, length = 100)
    private String deviceTypeName;
}
