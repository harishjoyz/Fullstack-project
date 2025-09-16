import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function BusList({ buses, onChanged, toast }) {
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    busNumber: "",
    route: "",
    capacity: "",
    availableSeats: ""
  });

  // 🔄 No need to load buses - they're passed as props
  // const loadBuses = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await api.get("/buses");
  //     setBuses(Array.isArray(data) ? data : []);
  //   } catch (e) {
  //     console.error(e);
  //     toast("❌ Failed to load buses", true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // ➕ Create new bus
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const payload = {
        busNumber: formData.get("busNumber"),
        route: formData.get("route"),
        capacity: Number(formData.get("capacity")),
        availableSeats: Number(formData.get("availableSeats"))
      };

      await api.post("/buses", payload);
      toast("✅ Bus created successfully");
      onChanged?.();
      // loadBuses(); // No longer needed
      
      // Reset form
      e.target.reset();
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to create bus";
      toast(`❌ ${errorMessage}`, true);
    }
  };

  // ✏️ Start editing
  const startEdit = (bus) => {
    setEditingId(bus.id);
    setEditForm({
      busNumber: bus.busNumber,
      route: bus.route,
      capacity: bus.capacity,
      availableSeats: bus.availableSeats
    });
  };

  // 💾 Save edit
  const handleEdit = async (id) => {
    try {
      await api.put(`/buses/${id}`, editForm);
      toast("✅ Bus updated successfully");
      setEditingId(null);
      onChanged?.();
      // loadBuses(); // No longer needed
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to update bus";
      toast(`❌ ${errorMessage}`, true);
    }
  };

  // ❌ Delete bus
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus?")) return;
    
    setDeletingId(id);
    try {
      await api.delete(`/buses/${id}`);
      toast("✅ Bus deleted successfully");
      onChanged?.();
      // loadBuses(); // No longer needed
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to delete bus";
      toast(`❌ ${errorMessage}`, true);
    } finally {
      setDeletingId(null);
    }
  };

  // 🔄 Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      busNumber: "",
      route: "",
      capacity: "",
      availableSeats: ""
    });
  };

  // useEffect(() => {
  //   loadBuses();
  // }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="section-subtitle">🚌 Bus Fleet</h3>
        <button 
          className="btn btn-secondary" 
          onClick={() => onChanged?.()} // Refresh buses when button is clicked
          disabled={!buses || buses.length === 0}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Create Bus Form */}
      <form onSubmit={handleCreate} className="form-section">
        <h4>➕ Add New Bus</h4>
        <div className="form-grid">
          <div>
            <label>🚌 Bus Number</label>
            <input
              name="busNumber"
              className="input"
              placeholder="e.g. B001"
              required
            />
          </div>
          <div>
            <label>🛣️ Route</label>
            <input
              name="route"
              className="input"
              placeholder="e.g. Mumbai to Delhi"
              required
            />
          </div>
          <div>
            <label>💺 Total Capacity</label>
            <input
              name="capacity"
              type="number"
              className="input"
              placeholder="50"
              min="1"
              required
            />
          </div>
          <div>
            <label>🆓 Available Seats</label>
            <input
              name="availableSeats"
              type="number"
              className="input"
              placeholder="50"
              min="0"
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          ✅ Add Bus
        </button>
      </form>

      {/* Bus List */}
      {!buses || buses.length === 0 ? (
        <div className="empty-state">
          <p>🚌 No buses found</p>
          <p className="text-muted">Add your first bus using the form above</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
          <thead>
            <tr>
              <th>ID</th>
                <th>🚌 Bus Number</th>
                <th>🛣️ Route</th>
                <th>💺 Capacity</th>
                <th>🆓 Available</th>
                <th>📊 Status</th>
                <th>⚡ Actions</th>
            </tr>
          </thead>
          <tbody>
              {buses.map((bus) => (
                <tr key={bus.id} className="table-row">
                  <td className="table-cell">#{bus.id}</td>
                  <td className="table-cell">
                    {editingId === bus.id ? (
                      <input
                        className="input input-sm"
                        value={editForm.busNumber}
                        onChange={(e) => setEditForm({...editForm, busNumber: e.target.value})}
                      />
                    ) : (
                      <strong>{bus.busNumber}</strong>
                    )}
                  </td>
                  <td className="table-cell">
                    {editingId === bus.id ? (
                      <input
                        className="input input-sm"
                        value={editForm.route}
                        onChange={(e) => setEditForm({...editForm, route: e.target.value})}
                      />
                    ) : (
                      bus.route
                    )}
                  </td>
                  <td className="table-cell">
                    {editingId === bus.id ? (
                      <input
                        className="input input-sm"
                        type="number"
                        min="1"
                        value={editForm.capacity}
                        onChange={(e) => setEditForm({...editForm, capacity: e.target.value})}
                      />
                    ) : (
                      <span className="badge">{bus.capacity}</span>
                    )}
                </td>
                  <td className="table-cell">
                    {editingId === bus.id ? (
                      <input
                        className="input input-sm"
                        type="number"
                        min="0"
                        value={editForm.availableSeats}
                        onChange={(e) => setEditForm({...editForm, availableSeats: e.target.value})}
                      />
                    ) : (
                      <span className={`badge ${bus.availableSeats === 0 ? 'badge-danger' : 'badge-success'}`}>
                        {bus.availableSeats}
                      </span>
                    )}
                  </td>
                  <td className="table-cell">
                    <span className={`status ${bus.availableSeats === 0 ? 'status-full' : bus.availableSeats < bus.capacity / 2 ? 'status-partial' : 'status-available'}`}>
                      {bus.availableSeats === 0 ? '🚫 Full' : bus.availableSeats < bus.capacity / 2 ? '⚠️ Partial' : '✅ Available'}
                    </span>
                  </td>
                  <td className="table-cell">
                    {editingId === bus.id ? (
                      <div className="action-buttons">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleEdit(bus.id)}
                        >
                          💾 Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={cancelEdit}
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => startEdit(bus)}
                          title="Edit this bus"
                        >
                          ✏️ Edit
                        </button>
                    <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(bus.id)}
                          disabled={deletingId === bus.id}
                          title="Delete this bus"
                        >
                          {deletingId === bus.id ? "⏳" : "🗑️"}
                    </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      )}

      {buses.length > 0 && (
        <div className="card-footer">
          <p className="text-muted">
            📊 Total: <strong>{buses.length}</strong> bus{buses.length !== 1 ? 'es' : ''} | 
            🆓 Available: <strong>{buses.reduce((sum, bus) => sum + bus.availableSeats, 0)}</strong> seats
          </p>
        </div>
      )}
    </div>
  );
}
