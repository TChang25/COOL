package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Device;
import com.example.prototypesetup.entity.DeviceStatus;
import com.example.prototypesetup.entity.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    List<Device> findByStatus(DeviceStatus status);
    List<Device> findByType(DeviceType type);
}
