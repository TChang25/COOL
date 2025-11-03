package com.example.prototypesetup.repository;

import com.example.prototypesetup.entity.Bin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BinRepository extends JpaRepository<Bin, Integer> {
}