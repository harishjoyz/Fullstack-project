package com.project.service;

import com.project.booking.Booking;
import java.util.List;

public interface BookingService {
	Booking save(Booking booking);

	List<Booking> findAll();

	Booking findById(Long id);

	Booking update(Long id, Booking booking);

	void delete(Long id);
}
