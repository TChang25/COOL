package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.UserLocationAccess;
import com.example.prototypesetup.entity.UserLocationAccessId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLocationAccessRepository extends JpaRepository<UserLocationAccess, UserLocationAccessId> {
}
