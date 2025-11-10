package com.COOL.userapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// <EntityType, PrimaryKeyType>
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // No additional methods required for basic CRUD operations
}
