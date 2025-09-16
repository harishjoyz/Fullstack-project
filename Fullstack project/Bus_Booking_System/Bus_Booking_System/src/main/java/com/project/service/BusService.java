package com.project.service;

import com.project.bus.in.Bus;
import java.util.List;

public interface BusService {
    Bus save(Bus entity);
    List<Bus> findAll();
    Bus findById(Long id);
    Bus update(Long id, Bus entity);
    void delete(Long id);
}
