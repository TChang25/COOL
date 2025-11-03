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
@Table(name = "device_status")
public class DeviceStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "device_status_id")
    private Integer deviceStatusId;

    @Column(name = "status_name", nullable = false, unique = true, length = 100)
    private String statusName;
}
