import React, { useState } from "react";
import api from "../api/axios";

export default function TourForm({ onCreated, toast }) {
  const [form, setForm] = useState({
    packageName: "",
    description: "",
    price: "",
    durationDays: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.packageName.trim()) {
      newErrors.packageName = "Package name is required";
    } else if (form.packageName.trim().length < 3) {
      newErrors.packageName = "Package name must be at least 3 characters";
    }
    
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
    } else if (form.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }
    
    if (!form.price || form.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!form.durationDays || form.durationDays <= 0) {
      newErrors.durationDays = "Duration must be at least 1 day";
    } else if (form.durationDays > 365) {
      newErrors.durationDays = "Duration cannot exceed 365 days";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const payload = {
        packageName: form.packageName.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        durationDays: parseInt(form.durationDays),
      };

      await api.post("/tour-packages", payload);
      toast("✅ Tour package created successfully!");
      
      // Reset form
      setForm({ packageName: "", description: "", price: "", durationDays: "" });
      setErrors({});
      
      // Notify parent to refresh
      onCreated?.();
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Failed to create tour package";
      toast(`❌ ${errorMessage}`, true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ packageName: "", description: "", price: "", durationDays: "" });
    setErrors({});
  };

  return (
    <form className="form card" onSubmit={handleSubmit}>
      <h3 className="section-subtitle">➕ Create Tour Package</h3>

      <div className="form-group">
        <label>🎒 Package Name</label>
        <input
          type="text"
          name="packageName"
          className={`input ${errors.packageName ? 'input-error' : ''}`}
          placeholder="e.g. Golden Triangle Tour"
          value={form.packageName}
          onChange={handleChange}
          required
        />
        {errors.packageName && (
          <span className="error-message">{errors.packageName}</span>
        )}
      </div>

      <div className="form-group">
        <label>📝 Description</label>
        <textarea
          name="description"
          className={`input ${errors.description ? 'input-error' : ''}`}
          placeholder="Describe the tour package, attractions, and highlights..."
          value={form.description}
          onChange={handleChange}
          rows="3"
          required
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>💰 Price (₹)</label>
          <input
            type="number"
            name="price"
            className={`input ${errors.price ? 'input-error' : ''}`}
            placeholder="0.00"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />
          {errors.price && (
            <span className="error-message">{errors.price}</span>
          )}
        </div>

        <div className="form-group">
          <label>⏱️ Duration (Days)</label>
          <input
            type="number"
            name="durationDays"
            className={`input ${errors.durationDays ? 'input-error' : ''}`}
            placeholder="1"
            min="1"
            max="365"
            value={form.durationDays}
            onChange={handleChange}
            required
          />
          {errors.durationDays && (
            <span className="error-message">{errors.durationDays}</span>
          )}
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={loading}
        >
          {loading ? "⏳ Creating..." : "✅ Create Tour Package"}
        </button>
        
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={handleReset}
          disabled={loading}
        >
          🔄 Reset
        </button>
      </div>
    </form>
  );
}
