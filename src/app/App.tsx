import React from 'react';
import { CarProvider, Home, CarView, CarForm, CarEdit, CarList, useCar } from '../features/car';
import './App.css';

type PageType = 'home' | 'view' | 'create' | 'edit' | 'viewList' | 'editList';

// Componente interno que usa el Context
const AppContent = () => {
  const { cars, selectCar } = useCar();
  const [currentPage, setCurrentPage] = React.useState<PageType>('home');

  // Navegación entre páginas
  const goToHome = () => setCurrentPage('home');
  const goToCreate = () => setCurrentPage('create');

  // Para ver vehículos
  const goToView = () => {
    if (cars.length === 1) {
      selectCar(cars[0].id);
      setCurrentPage('view');
    } else {
      setCurrentPage('viewList');
    }
  };

  // Para editar vehículos
  const goToEdit = () => {
    if (cars.length === 1) {
      selectCar(cars[0].id);
      setCurrentPage('edit');
    } else {
      setCurrentPage('editList');
    }
  };

  // Seleccionar vehículo para ver
  const handleSelectCarForView = (carId: string) => {
    selectCar(carId);
    setCurrentPage('view');
  };

  // Seleccionar vehículo para editar
  const handleSelectCarForEdit = (carId: string) => {
    selectCar(carId);
    setCurrentPage('edit');
  };

  return (
    <div className="app-container">
      {/* Header fijo con título y botón de inicio */}
      {currentPage !== 'home' && (
        <header className="app-header">
          <div className="header-content">
            <button
              onClick={goToHome}
              className="back-btn"
            >
              ← Inicio
            </button>
            <h1 className="app-title">Car Maintenance Tracker</h1>
          </div>
        </header>
      )}

      <main className="app-main">
        {currentPage === 'home' && (
          <Home
            onViewCar={goToView}
            onEditCar={goToEdit}
            onCreateCar={goToCreate}
          />
        )}

        {currentPage === 'viewList' && (
          <CarList
            onCarSelect={handleSelectCarForView}
            onBack={goToHome}
            title="Seleccionar Vehículo"
            actionText="Ver Detalles"
          />
        )}

        {currentPage === 'editList' && (
          <CarList
            onCarSelect={handleSelectCarForEdit}
            onBack={goToHome}
            title="Seleccionar Vehículo"
            actionText="Editar"
          />
        )}

        {currentPage === 'view' && (
          <CarView />
        )}

        {currentPage === 'create' && (
          <div className="car-create-container">
            <div className="car-create-header">
              <h2>Registrar Nuevo Vehículo</h2>
              <p>Ingresa los datos de tu vehículo para comenzar a hacer seguimiento</p>
            </div>
            <CarForm
              onSuccess={goToHome}
              onCancel={goToHome}
            />
          </div>
        )}

        {currentPage === 'edit' && (
          <CarEdit
            onSuccess={goToHome}
            onCancel={goToHome}
          />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <CarProvider>
      <AppContent />
    </CarProvider>
  );
}

export default App;