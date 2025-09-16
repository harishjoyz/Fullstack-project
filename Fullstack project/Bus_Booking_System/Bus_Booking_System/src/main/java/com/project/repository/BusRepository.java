package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.bus.in.Bus;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
}
