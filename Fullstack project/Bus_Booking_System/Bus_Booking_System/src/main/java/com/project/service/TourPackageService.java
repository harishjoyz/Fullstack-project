package com.project.service;

import com.project.tourpackage.TourPackage;
import java.util.List;

public interface TourPackageService {
    TourPackage save(TourPackage tourPackage);
    List<TourPackage> findAll();
    TourPackage findById(Long id);
    TourPackage update(Long id, TourPackage tourPackage);
    void delete(Long id);
}
