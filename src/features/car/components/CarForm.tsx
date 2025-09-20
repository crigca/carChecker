import React, { useState, useEffect } from 'react';
import './CarForm.css';
import type { ICarFormData, ICarFormErrors } from '../types/carTypes';
import { useCar } from '../hooks/useCar';

interface ICarFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CarForm = ({ onSuccess, onCancel }: ICarFormProps) => {
  const { selectedCar: car, loading, error, saveCar, clearError } = useCar();
  
  // Form state
  const [formData, setFormData] = useState<ICarFormData>({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    currentKm: 0,
    fuelType: 'gasoline',
    licensePlate: ''
  });

  const [errors, setErrors] = useState<ICarFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing car data if available
  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: car.year,
        currentKm: car.currentKm,
        fuelType: car.fuelType,
        licensePlate: car.licensePlate || ''
      });
    }
  }, [car]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'currentKm' ? Number(value) : value
    }));

    // Clear field error when user starts typing
    if (errors[name as keyof ICarFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: ICarFormErrors = {};

    // Brand validation
    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    } else if (formData.brand.trim().length < 2) {
      newErrors.brand = 'Brand must be at least 2 characters';
    }

    // Model validation
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    } else if (formData.model.trim().length < 1) {
      newErrors.model = 'Model must be at least 1 character';
    }

    // Year validation
    const currentYear = new Date().getFullYear();
    if (formData.year < 1900) {
      newErrors.year = 'Year must be 1900 or later';
    } else if (formData.year > currentYear + 1) {
      newErrors.year = `Year cannot be later than ${currentYear + 1}`;
    }

    // Kilometers validation
    if (formData.currentKm < 0) {
      newErrors.currentKm = 'Kilometers cannot be negative';
    } else if (formData.currentKm > 999999) {
      newErrors.currentKm = 'Kilometers seems too high';
    }

    // License plate validation (optional but format check)
    if (formData.licensePlate && formData.licensePlate.trim().length > 0) {
      const plateRegex = /^[A-Z0-9\s-]{3,10}$/i;
      if (!plateRegex.test(formData.licensePlate.trim())) {
        newErrors.licensePlate = 'Invalid license plate format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await saveCar({
        ...formData,
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        licensePlate: formData.licensePlate?.trim() || undefined
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setErrors({ general: 'Failed to save car data. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="car-form-container">
      <div className="car-form-header">
        <h2 className="car-form-title">
          {car ? 'Update Car Information' : 'Add Your Car'}
        </h2>
        <p className="car-form-subtitle">
          Enter your car details to start tracking maintenance
        </p>
      </div>

      <form className="car-form" onSubmit={handleSubmit}>
        {/* Brand Field */}
        <div className="form-group">
          <label htmlFor="brand" className="form-label">
            Brand *
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className={`form-input ${errors.brand ? 'form-input-error' : ''}`}
            placeholder="e.g. Toyota, Ford, Honda"
            required
            disabled={loading || isSubmitting}
          />
          {errors.brand && (
            <span className="form-error">{errors.brand}</span>
          )}
        </div>

        {/* Model Field */}
        <div className="form-group">
          <label htmlFor="model" className="form-label">
            Model *
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            className={`form-input ${errors.model ? 'form-input-error' : ''}`}
            placeholder="e.g. Corolla, Focus, Civic"
            required
            disabled={loading || isSubmitting}
          />
          {errors.model && (
            <span className="form-error">{errors.model}</span>
          )}
        </div>

        {/* Year and Fuel Type Row */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="year" className="form-label">
              Year *
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className={`form-input ${errors.year ? 'form-input-error' : ''}`}
              min="1900"
              max={new Date().getFullYear() + 1}
              required
              disabled={loading || isSubmitting}
            />
            {errors.year && (
              <span className="form-error">{errors.year}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="fuelType" className="form-label">
              Fuel Type *
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="form-select"
              required
              disabled={loading || isSubmitting}
            >
              <option value="gasoline">Gasoline</option>
              <option value="diesel">Diesel</option>
            </select>
          </div>
        </div>

        {/* Kilometers Field */}
        <div className="form-group">
          <label htmlFor="currentKm" className="form-label">
            Current Kilometers *
          </label>
          <input
            type="number"
            id="currentKm"
            name="currentKm"
            value={formData.currentKm}
            onChange={handleInputChange}
            className={`form-input ${errors.currentKm ? 'form-input-error' : ''}`}
            min="0"
            max="999999"
            placeholder="e.g. 85000"
            required
            disabled={loading || isSubmitting}
          />
          {errors.currentKm && (
            <span className="form-error">{errors.currentKm}</span>
          )}
        </div>

        {/* License Plate Field */}
        <div className="form-group">
          <label htmlFor="licensePlate" className="form-label">
            License Plate (Optional)
          </label>
          <input
            type="text"
            id="licensePlate"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleInputChange}
            className={`form-input ${errors.licensePlate ? 'form-input-error' : ''}`}
            placeholder="e.g. ABC123"
            disabled={loading || isSubmitting}
          />
          {errors.licensePlate && (
            <span className="form-error">{errors.licensePlate}</span>
          )}
        </div>

        {/* Error Messages */}
        {error && (
          <div className="form-error-general">
            {error}
          </div>
        )}

        {errors.general && (
          <div className="form-error-general">
            {errors.general}
          </div>
        )}

        {/* Action Buttons */}
        <div className="form-actions">
          {onCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading || isSubmitting}
            >
              Cancel
            </button>
          )}
          
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || isSubmitting}
          >
            {isSubmitting ? 'Saving...' : car ? 'Update Car' : 'Save Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;