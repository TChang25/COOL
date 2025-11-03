package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanStatusRepository extends JpaRepository<LoanStatus, Integer> {
}