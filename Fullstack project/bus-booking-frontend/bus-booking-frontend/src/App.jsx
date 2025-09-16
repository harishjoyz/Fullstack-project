import React, { useState, useEffect, useRef } from "react";
import BusList from "./components/BusList";
import TourForm from "./components/TourForm";
import TourList from "./components/TourList";
import BookingForm from "./components/BookingForm";
import BookingList from "./components/BookingList";
import api from "./api/axios";

export default function App() {
  const [buses, setBuses] = useState([]);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState("buses"); // buses, tours, bookings

  // Refs for smooth scrolling
  const busesRef = useRef(null);
  const toursRef = useRef(null);
  const bookingsRef = useRef(null);

  // 🔄 Load all data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [busesRes, toursRes, bookingsRes] = await Promise.all([
        api.get("/buses"),
        api.get("/tour-packages"),
        api.get("/bookings")
      ]);
      
      setBuses(Array.isArray(busesRes.data) ? busesRes.data : []);
      setTours(Array.isArray(toursRes.data) ? toursRes.data : []);
      setBookings(Array.isArray(bookingsRes.data) ? bookingsRes.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Refresh data
  const refresh = () => {
    loadData();
  };

  // 📱 Toast notification
  const toast = (message, isError = false) => {
    const toastEl = document.getElementById("toast");
    if (toastEl) {
      toastEl.textContent = message;
      toastEl.className = `toast ${isError ? "error" : "success"}`;
      toastEl.style.display = "block";
      
      setTimeout(() => {
        toastEl.style.display = "none";
      }, 3000);
    }
  };

  // 🎯 Navigate to page
  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  // 📊 Calculate statistics
  const totalBuses = buses.length;
  const totalAvailableSeats = buses.reduce((sum, bus) => sum + bus.availableSeats, 0);
  const totalTours = tours.length;
  const totalTourValue = tours.reduce((sum, tour) => sum + tour.price, 0);

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Bus Booking System...</p>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="brand">
            🚌 Bus Booking
            <span className="badge">Dashboard</span>
          </div>
          
          <div className="nav">
            <button 
              className={`nav-link ${currentPage === "buses" ? "active" : ""}`}
              onClick={() => navigateToPage("buses")}
            >
              🚌 Buses
            </button>
            <button 
              className={`nav-link ${currentPage === "tours" ? "active" : ""}`}
              onClick={() => navigateToPage("tours")}
            >
              🎒 Tours
            </button>
            <button 
              className={`nav-link ${currentPage === "bookings" ? "active" : ""}`}
              onClick={() => navigateToPage("bookings")}
            >
              🧾 Bookings
            </button>
          </div>
        </div>
      </nav>

      {/* Statistics Banner */}
      <div className="stats-banner">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-icon">🚌</span>
              <div className="stat-content">
                <div className="stat-value">{totalBuses}</div>
                <div className="stat-label">Total Buses</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💺</span>
              <div className="stat-content">
                <div className="stat-value">{totalAvailableSeats}</div>
                <div className="stat-label">Available Seats</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🎒</span>
              <div className="stat-content">
                <div className="stat-value">{totalTours}</div>
                <div className="stat-label">Tour Packages</div>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">💰</span>
              <div className="stat-content">
                <div className="stat-value">₹{totalTourValue.toFixed(2)}</div>
                <div className="stat-label">Total Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Error Display */}
        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
            <button className="btn btn-secondary btn-sm" onClick={loadData}>
              🔄 Retry
            </button>
          </div>
        )}

        {/* Page Content */}
        {currentPage === "buses" && (
          <section ref={busesRef} id="buses" className="card">
            <h2 className="section-title">🚌 Bus Fleet</h2>
            <BusList buses={buses} onChanged={refresh} toast={toast} />
          </section>
        )}

        {currentPage === "tours" && (
          <section ref={toursRef} id="tours" className="card">
            <h2 className="section-title">🎒 Tour Packages</h2>
            <TourForm onCreated={refresh} toast={toast} />
            <TourList tours={tours} onChanged={refresh} toast={toast} />
          </section>
        )}

        {currentPage === "bookings" && (
          <section ref={bookingsRef} id="bookings" className="card">
            <h2 className="section-title">🧾 Bookings</h2>
            <BookingForm onCreated={refresh} toast={toast} />
            <BookingList onChanged={refresh} toast={toast} />
          </section>
        )}

        {/* Footer */}
        <footer className="app-footer">
          <p>🚌 Bus Booking System v1.0 | Built with React</p>
          <button className="btn btn-secondary btn-sm" onClick={loadData}>
            🔄 Refresh All Data
          </button>
        </footer>
      </div>

      <div id="toast" aria-live="polite" />
    </>
  );
}
