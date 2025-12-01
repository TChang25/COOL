package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.DeviceCondition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeviceConditionRepository extends JpaRepository<DeviceCondition, Integer> {
}