// src/components/BookingList.jsx
import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function BookingList({ onChanged, toast }) {
  const [bookings, setBookings] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const loadBookings = async () => {
    try {
      const { data } = await api.get("/bookings");
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      toast("Failed to load bookings", true);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    setDeletingId(id);
    try {
      await api.delete(`/bookings/${id}`);
      toast("Booking deleted ❌");
      onChanged?.();
      loadBookings();
    } catch (e) {
      console.error(e);
      toast("Delete failed", true);
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [onChanged]);

  return (
    <div className="card">
      <h3>📒 Bookings</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Bus</th>
              <th>Tour</th>
              <th>Seats</th>
              <th>Seat No(s)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No bookings yet
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.customerName || "-"}</td>
                  <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}</td>
                  <td>
                    {b.bus?.busNumber ? `${b.bus.busNumber} — ${b.bus.route}` : "N/A"}
                  </td>
                  <td>{b.tourPackage?.packageName || "-"}</td>
                  <td>{b.seatsBooked ?? "-"}</td>
                  <td>{b.seatNo || "-"}</td>
                  <td>
                    <button
                      className="btn btn-ghost danger"
                      onClick={() => handleDelete(b.id)}
                      disabled={deletingId === b.id}
                    >
                      {deletingId === b.id ? "Deleting..." : "❌ Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
