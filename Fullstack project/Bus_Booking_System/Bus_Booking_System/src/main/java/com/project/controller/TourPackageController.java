package com.project.controller;

import com.project.tourpackage.TourPackage;
import com.project.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tour-packages")
@CrossOrigin(origins = "http://localhost:3000")
public class TourPackageController {

    @Autowired
    private TourPackageService tourService;

    @PostMapping
    public TourPackage create(@RequestBody TourPackage tourPackage) {
        tourPackage.setId(null); 
        return tourService.save(tourPackage);
    }


    @GetMapping
    public List<TourPackage> getAll() {
        return tourService.findAll();
    }

    @GetMapping("/{id}")
    public TourPackage getById(@PathVariable Long id) {
        return tourService.findById(id);
    }

    @PutMapping("/{id}")
    public TourPackage update(@PathVariable Long id, @RequestBody TourPackage tourPackage) {
        return tourService.update(id, tourPackage);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tourService.delete(id);
    }
}
