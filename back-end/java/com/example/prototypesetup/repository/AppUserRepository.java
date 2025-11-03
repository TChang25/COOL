package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByFullName(String fullName);
    AppUser findByEmail(String email);
}
