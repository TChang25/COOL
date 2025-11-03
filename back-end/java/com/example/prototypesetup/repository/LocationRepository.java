package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Integer> {
    Location findByLocationName(String locationName);
}
