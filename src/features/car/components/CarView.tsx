import React from 'react';
import { useCar } from '../hooks/useCar';
import './CarInfo.css';

interface ICarViewProps {
  onEdit?: () => void;
}

const CarView = ({ onEdit }: ICarViewProps) => {
  const { selectedCar: car, loading } = useCar();

  if (loading) {
    return (
      <div className="car-info-container">
        <div className="car-info-loading">
          Cargando información del vehículo...
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="car-info-container">
        <div className="car-info-empty">
          <h3 className="car-info-empty-title">No hay vehículo registrado</h3>
          <p className="car-info-empty-text">
            Agrega la información de tu vehículo para comenzar
          </p>
        </div>
      </div>
    );
  }

  const formatFuelType = (fuelType: string): string => {
    return fuelType === 'gasoline' ? 'Gasolina' : 'Diesel';
  };

  const formatKilometers = (km: number): string => {
    return km.toLocaleString() + ' km';
  };

  return (
    <div className="car-info-container">
      <div className="car-info-header">
        <h2 className="car-info-title">
          Mi Vehículo
        </h2>
      </div>

      <div className="car-details-card">
        <div className="car-main-info">
          <h3>{car.brand} {car.model}</h3>
          <p className="car-year">{car.year}</p>
        </div>

        <div className="car-info-details">
          <div className="car-info-row">
            <span className="car-info-label">Combustible:</span>
            <span className="car-info-value">{formatFuelType(car.fuelType)}</span>
          </div>

          <div className="car-info-row">
            <span className="car-info-label">Kilómetros actuales:</span>
            <span className="car-info-value">{formatKilometers(car.currentKm)}</span>
          </div>

          {car.licensePlate && (
            <div className="car-info-row">
              <span className="car-info-label">Patente:</span>
              <span className="car-info-value">{car.licensePlate}</span>
            </div>
          )}

          <div className="car-info-row">
            <span className="car-info-label">Registrado:</span>
            <span className="car-info-value">
              {new Date(car.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CarView;