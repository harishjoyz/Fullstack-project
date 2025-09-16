package com.project.service.impl;

import com.project.bus.in.Bus;
import com.project.repository.BusRepository;
import com.project.service.BusService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BusServiceImpl implements BusService {

    private final BusRepository busRepo;

    public BusServiceImpl(BusRepository busRepo) {
        this.busRepo = busRepo;
    }

    @Override
    public Bus save(Bus entity) {
        return busRepo.save(entity);
    }

    @Override
    public List<Bus> findAll() {
        return busRepo.findAll();
    }

    @Override
    public Bus findById(Long id) {
        return busRepo.findById(id).orElse(null);
    }

    @Override
    public Bus update(Long id, Bus entity) {
        if (busRepo.existsById(id)) {
            entity.setId(id);
            return busRepo.save(entity);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        busRepo.deleteById(id);
    }
}
