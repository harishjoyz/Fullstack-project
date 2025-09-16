package com.project.controller;

import com.project.booking.Booking;
import com.project.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // CREATE booking
    @PostMapping
    public ResponseEntity<Booking> create(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.save(booking);
        return ResponseEntity.ok(savedBooking);
    }

    // GET all bookings
    @GetMapping
    public ResponseEntity<Iterable<Booking>> getAll() {
        return ResponseEntity.ok(bookingService.findAll());
    }

    // GET booking by id
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getById(@PathVariable Long id) {
        Booking booking = bookingService.findById(id);
        return ResponseEntity.ok(booking);
    }

    // UPDATE booking
    @PutMapping("/{id}")
    public ResponseEntity<Booking> update(@PathVariable Long id, @RequestBody Booking booking) {
        Booking updatedBooking = bookingService.update(id, booking);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bookingService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
