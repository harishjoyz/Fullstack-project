package com.project.service.impl;

import com.project.tourpackage.TourPackage;
import com.project.repository.TourPackageRepository;
import com.project.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TourPackageServiceImpl implements TourPackageService {

    @Autowired
    private TourPackageRepository tourPackageRepo;

    @Override
    public TourPackage save(TourPackage tourPackage) {
        return tourPackageRepo.save(tourPackage);
    }

    @Override
    public List<TourPackage> findAll() {
        return tourPackageRepo.findAll();
    }

    @Override
    public TourPackage findById(Long id) {
        return tourPackageRepo.findById(id).orElse(null);
    }

    @Override
    public TourPackage update(Long id, TourPackage tourPackage) {
        if (tourPackageRepo.existsById(id)) {
            tourPackage.setId(id);
            return tourPackageRepo.save(tourPackage);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        tourPackageRepo.deleteById(id);
    }
}
