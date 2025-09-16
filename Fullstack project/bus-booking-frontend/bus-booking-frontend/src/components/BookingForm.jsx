import React, { useState, useEffect } from "react";
import api from "../api/axios";

export default function BookingForm({ onCreated, toast }) {
  const [buses, setBuses] = useState([]);
  const [tours, setTours] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [busId, setBusId] = useState("");
  const [tourId, setTourId] = useState("");
  const [seatNo, setSeatNo] = useState("");
  const [seatsBooked, setSeatsBooked] = useState("");
  const [loading, setLoading] = useState(false);

  // Load buses
  const loadBuses = async () => {
    try {
      const { data } = await api.get("/buses");
      setBuses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast("Failed to load buses", true);
    }
  };

  // Load tours
  const loadTours = async () => {
    try {
      const { data } = await api.get("/tour-packages");
      setTours(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast("Failed to load tours", true);
    }
  };

  useEffect(() => {
    loadBuses();
    loadTours();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerName || !bookingDate || !busId || !tourId || !seatNo || !seatsBooked) {
      toast("Please fill all fields ⚠", true);
      return;
    }

    const seatArray = seatNo.split(",").map(s => s.trim()).filter(s => s);
    if (seatArray.length !== Number(seatsBooked)) {
      toast("Seat count does not match seat numbers ⚠", true);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customerName,
        bookingDate,
        bus: { id: busId },
        tourPackage: { id: tourId },
        seatsBooked: Number(seatsBooked),
        seatNo
      };

      await api.post("/bookings", payload);
      toast("Booking created ✅");
      onCreated?.();
      
      // Clear form
      setCustomerName("");
      setBookingDate("");
      setBusId("");
      setTourId("");
      setSeatNo("");
      setSeatsBooked("");
    } catch (err) {
      console.error(err);
      toast("Failed to create booking", true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h3>➕ Create Booking</h3>

      <label>Customer name</label>
      <input 
        className="input" 
        value={customerName} 
        onChange={e => setCustomerName(e.target.value)} 
        placeholder="Enter customer name"
        required 
      />

      <label>Seat numbers (e.g. A1,A2)</label>
      <input 
        className="input" 
        value={seatNo} 
        onChange={e => setSeatNo(e.target.value)} 
        placeholder="e.g. A1,A2" 
        required 
      />

      <label>Seats booked</label>
      <input 
        className="input" 
        type="number" 
        value={seatsBooked} 
        onChange={e => setSeatsBooked(e.target.value)} 
        placeholder="2" 
        min="1"
        required 
      />

      <label>Select Bus</label>
      <select className="select" value={busId} onChange={e => setBusId(e.target.value)} required>
        <option value="">-- choose bus --</option>
        {buses.map(b => (
          <option key={b.id} value={b.id}>
            {b.busNumber} — {b.route}
          </option>
        ))}
      </select>

      <label>Select Tour Package</label>
      <select className="select" value={tourId} onChange={e => setTourId(e.target.value)} required>
        <option value="">-- choose tour --</option>
        {tours.map(t => (
          <option key={t.id} value={t.id}>
            {t.packageName} — ₹{t.price}
          </option>
        ))}
      </select>

      <label>Booking Date</label>
      <input 
        className="input" 
        type="date" 
        value={bookingDate} 
        onChange={e => setBookingDate(e.target.value)} 
        required 
      />

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Booking..." : "Book"}
      </button>
    </form>
  );
}
