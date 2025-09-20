import React, { useState } from 'react';
import { CarForm } from './';
import { useCar } from '../hooks/useCar';
import './CarEdit.css';

interface ICarEditProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const CarEdit = ({ onSuccess, onCancel }: ICarEditProps) => {
  const { selectedCar, deleteCar } = useCar();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCar) return;

    setIsDeleting(true);
    try {
      await deleteCar(selectedCar.id);
      onSuccess(); // Volver al inicio después de eliminar
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="car-edit-container">
      <div className="car-edit-header">
        <h2>Editar Vehículo</h2>
        <p>Modifica los datos de tu vehículo</p>
      </div>

      <CarForm
        onSuccess={onSuccess}
        onCancel={onCancel}
      />

      {/* Botón de eliminar */}
      <div className="delete-section">
        <button
          type="button"
          onClick={handleDeleteClick}
          className="delete-btn"
          disabled={isDeleting}
        >
          🗑️ Eliminar Vehículo
        </button>
      </div>

      {/* Modal de confirmación */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3>¿Eliminar vehículo?</h3>
            <p>
              Esta acción no se puede deshacer. Se eliminará permanentemente:
            </p>
            {selectedCar && (
              <div className="delete-car-info">
                <strong>{selectedCar.brand} {selectedCar.model} ({selectedCar.year})</strong>
              </div>
            )}

            <div className="delete-modal-actions">
              <button
                type="button"
                onClick={handleDeleteCancel}
                className="btn btn-secondary"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="btn btn-danger"
                disabled={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarEdit;