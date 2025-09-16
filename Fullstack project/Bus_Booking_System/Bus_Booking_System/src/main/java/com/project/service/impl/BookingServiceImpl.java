package com.project.service.impl;

import com.project.booking.Booking;
import com.project.repository.BookingRepository;
import com.project.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    @Override
    public Booking save(Booking booking) {
        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> findAll() {
        return bookingRepo.findAll();
    }

    @Override
    public Booking findById(Long id) {
        return bookingRepo.findById(id).orElse(null);
    }

    @Override
    public Booking update(Long id, Booking booking) {
        if (bookingRepo.existsById(id)) {
            booking.setId(id);
            return bookingRepo.save(booking);
        }
        return null;
    }

    @Override
    public void delete(Long id) {
        bookingRepo.deleteById(id);
    }
}
