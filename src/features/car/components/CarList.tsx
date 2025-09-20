import React from 'react';
import { useCar } from '../hooks/useCar';
import './CarList.css';

interface ICarListProps {
  onCarSelect: (carId: string) => void;
  onBack: () => void;
  title: string;
  actionText: string;
}

const CarList = ({ onCarSelect, onBack, title, actionText }: ICarListProps) => {
  const { cars, loading } = useCar();

  if (loading) {
    return (
      <div className="car-list-container">
        <div className="car-list-loading">
          Cargando vehículos...
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
    <div className="car-list-container">
      <div className="car-list-header">
        <h2>{title}</h2>
        <p>Selecciona el vehículo que deseas {actionText.toLowerCase()}</p>
      </div>

      <div className="car-list-grid">
        {cars.map((car) => (
          <div
            key={car.id}
            className="car-card"
            onClick={() => onCarSelect(car.id)}
          >
            <div className="car-card-main">
              <h3 className="car-card-title">
                {car.brand} {car.model}
              </h3>
              <p className="car-card-year">{car.year}</p>
            </div>

            <div className="car-card-details">
              <div className="car-detail">
                <span className="car-detail-label">Combustible:</span>
                <span className="car-detail-value">{formatFuelType(car.fuelType)}</span>
              </div>

              <div className="car-detail">
                <span className="car-detail-label">Kilómetros:</span>
                <span className="car-detail-value">{formatKilometers(car.currentKm)}</span>
              </div>

              {car.licensePlate && (
                <div className="car-detail">
                  <span className="car-detail-label">Patente:</span>
                  <span className="car-detail-value">{car.licensePlate}</span>
                </div>
              )}
            </div>

            <div className="car-card-action">
              <span className={`action-text ${actionText === 'Editar' ? 'edit-action' : ''}`}>
                {actionText}
              </span>
              <span className={`action-arrow ${actionText === 'Editar' ? 'edit-action' : ''}`}>
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      {cars.length === 0 && (
        <div className="car-list-empty">
          <h3>No hay vehículos registrados</h3>
          <p>Agrega tu primer vehículo para comenzar</p>
        </div>
      )}
    </div>
  );
};

export default CarList;