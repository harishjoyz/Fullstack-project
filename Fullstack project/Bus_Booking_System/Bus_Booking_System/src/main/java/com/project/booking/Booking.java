package com.project.booking;

import com.project.tourpackage.TourPackage;
import com.project.bus.in.Bus;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Customer name is required")
    @Size(min = 2, max = 100, message = "Customer name must be between 2 and 100 characters")
    @Column(nullable = false)
    private String customerName;
    
    @NotNull(message = "Booking date is required")
    @Column(nullable = false)
    private LocalDate bookingDate;

    @NotNull(message = "Bus is required")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bus_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Bus bus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tour_package_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private TourPackage tourPackage;

    @Positive(message = "Seats booked must be positive")
    @Column(nullable = false)
    private int seatsBooked;
    
    @Size(max = 500, message = "Seat numbers cannot exceed 500 characters")
    @Column(columnDefinition = "TEXT")
    private String seatNo;  // comma-separated seat numbers

    // Default constructor
    public Booking() {}

    // Parameterized constructor
    public Booking(String customerName, LocalDate bookingDate, Bus bus, TourPackage tourPackage, int seatsBooked, String seatNo) {
        this.customerName = customerName;
        this.bookingDate = bookingDate;
        this.bus = bus;
        this.tourPackage = tourPackage;
        this.seatsBooked = seatsBooked;
        this.seatNo = seatNo;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public LocalDate getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDate bookingDate) { this.bookingDate = bookingDate; }

    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }

    public TourPackage getTourPackage() { return tourPackage; }
    public void setTourPackage(TourPackage tourPackage) { this.tourPackage = tourPackage; }

    public int getSeatsBooked() { return seatsBooked; }
    public void setSeatsBooked(int seatsBooked) { this.seatsBooked = seatsBooked; }

    public String getSeatNo() { return seatNo; }
    public void setSeatNo(String seatNo) { this.seatNo = seatNo; }
}
