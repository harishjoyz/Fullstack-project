package com.project.controller;


import com.project.bus.in.Bus;
import com.project.service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/buses")
@CrossOrigin(origins = "http://localhost:3000")
public class BusController {

    @Autowired
    private BusService busService;

    @PostMapping
    public Bus create(@RequestBody Bus bus) {
        return busService.save(bus);
    }

    @GetMapping
    public List<Bus> getAll() {
        return busService.findAll();
    }

    @GetMapping("/{id}")
    public Bus getById(@PathVariable Long id) {
        return busService.findById(id);
    }

    @PutMapping("/{id}")
    public Bus update(@PathVariable Long id, @RequestBody Bus bus) {
        return busService.update(id, bus);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        busService.delete(id);
    }
}
