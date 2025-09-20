import React from 'react';
import { useCar } from '../hooks/useCar';
import './Home.css';

interface IHomeProps {
  onViewCar: () => void;
  onEditCar: () => void;
  onCreateCar: () => void;
}

const Home = ({ onViewCar, onEditCar, onCreateCar }: IHomeProps) => {
  const { hasCarData, canAddMoreCars, cars, loading } = useCar();

  if (loading) {
    return (
      <div className="home-container">
        <div className="home-loading">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Car Maintenance Tracker</h1>
        <p className="home-subtitle">
          Gestiona el mantenimiento de tus vehículos
        </p>

        {hasCarData && (
          <div className="cars-summary">
            <p>Tienes {cars.length} vehículo{cars.length !== 1 ? 's' : ''} registrado{cars.length !== 1 ? 's' : ''}</p>
          </div>
        )}
      </div>

      <div className="home-actions">
        {hasCarData && (
          <button
            className="home-btn home-btn-primary"
            onClick={onViewCar}
          >
            <div className="btn-icon">👁️</div>
            <div className="btn-content">
              <h3>Ver Vehículo</h3>
              <p>Revisar información de tus vehículos</p>
            </div>
          </button>
        )}

        {hasCarData && (
          <button
            className="home-btn home-btn-primary"
            onClick={onEditCar}
          >
            <div className="btn-icon">✏️</div>
            <div className="btn-content">
              <h3>Editar Vehículo</h3>
              <p>Modificar datos del vehículo</p>
            </div>
          </button>
        )}

        <button
          className={`home-btn ${canAddMoreCars ? 'home-btn-success' : 'home-btn-disabled'}`}
          onClick={onCreateCar}
          disabled={!canAddMoreCars}
        >
          <div className="btn-icon">➕</div>
          <div className="btn-content">
            <h3>Agregar Vehículo</h3>
            <p>
              {canAddMoreCars
                ? 'Registrar un nuevo vehículo'
                : `Máximo 3 vehículos (${cars.length}/3)`
              }
            </p>
          </div>
        </button>

        {!hasCarData && (
          <div className="home-welcome">
            <h2>¡Bienvenido!</h2>
            <p>Comienza registrando tu primer vehículo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;