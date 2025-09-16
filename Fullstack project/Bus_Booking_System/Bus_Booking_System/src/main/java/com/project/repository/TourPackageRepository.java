package com.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.project.tourpackage.TourPackage;

@Repository
public interface TourPackageRepository extends JpaRepository<TourPackage, Long> {
}
