package com.project.bus.in;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "buses")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Bus number is required")
    @Size(min = 3, max = 20, message = "Bus number must be between 3 and 20 characters")
    @Column(unique = true, nullable = false)
    private String busNumber;
    
    @NotBlank(message = "Driver name is required")
    @Size(min = 2, max = 100, message = "Driver name must be between 2 and 100 characters")
    @Column(nullable = false)
    private String driverName;
    
    @NotBlank(message = "Route is required")
    @Size(min = 5, max = 200, message = "Route must be between 5 and 200 characters")
    @Column(nullable = false)
    private String route;
    
    @Positive(message = "Total seats must be positive")
    @Max(value = 100, message = "Total seats cannot exceed 100")
    @Column(nullable = false)
    private int totalSeats;
    
    @PositiveOrZero(message = "Available seats cannot be negative")
    @Column(nullable = false)
    private int availableSeats;

    // Default constructor
    public Bus() {}

    // Parameterized constructor
    public Bus(String busNumber, String driverName, String route, int totalSeats) {
        this.busNumber = busNumber;
        this.driverName = driverName;
        this.route = route;
        this.totalSeats = totalSeats;
        this.availableSeats = totalSeats; // Set available seats equal to total seats initially
    }

    // Before saving, set availableSeats = totalSeats
    @PrePersist
    public void prePersist() {
        this.availableSeats = this.totalSeats;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getDriverName() { return driverName; }
    public void setDriverName(String driverName) { this.driverName = driverName; }

    public String getRoute() { return route; }
    public void setRoute(String route) { this.route = route; }

    public int getTotalSeats() { return totalSeats; }
    public void setTotalSeats(int totalSeats) { this.totalSeats = totalSeats; }

    public int getAvailableSeats() { return availableSeats; }
    public void setAvailableSeats(int availableSeats) { this.availableSeats = availableSeats; }
}
