import React, { useState } from "react";
import api from "../api/axios";

export default function TourList({ tours = [], onChanged, toast }) {
  const [busyId, setBusyId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tour package?")) return;
    try {
      setBusyId(id);
      await api.delete(`/tour-packages/${id}`);
      toast && toast("Tour deleted ✅");
      onChanged?.();
    } catch (e) {
      console.error(e);
      toast && toast("Failed to delete tour", true);
    } finally {
      setBusyId(null);
    }
  };

  if (!tours.length) return <p className="muted">No tours available.</p>;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((t) => (
            <tr key={t.id}>
              <td>{t.packageName}</td>
              <td className="text-clip">{t.description}</td>
              <td>₹{t.price}</td>
              <td>{t.durationDays} days</td>
              <td>
                <button className="btn btn-ghost" disabled={busyId === t.id} onClick={() => handleDelete(t.id)}>
                  {busyId === t.id ? "Deleting…" : "❌ Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
