package com.project.tourpackage;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tour_packages")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Package name is required")
    @Size(min = 2, max = 100, message = "Package name must be between 2 and 100 characters")
    @Column(nullable = false)
    private String packageName;
    
    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Positive(message = "Price must be positive")
    @Column(nullable = false)
    private double price;
    
    @Positive(message = "Duration must be positive")
    @Column(nullable = false)
    private int durationDays;

    // Default constructor
    public TourPackage() {}

    // Parameterized constructor
    public TourPackage(String packageName, String description, double price, int durationDays) {
        this.packageName = packageName;
        this.description = description;
        this.price = price;
        this.durationDays = durationDays;
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPackageName() { return packageName; }
    public void setPackageName(String packageName) { this.packageName = packageName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getDurationDays() { return durationDays; }
    public void setDurationDays(int durationDays) { this.durationDays = durationDays; }
}
