import { useEffect } from 'react';
import { useCarContext } from '../context/CarContext';
import type { ICar } from '../../../types/global';
import type { ICarFormData } from '../types/carTypes';

// Custom hook interface
interface IUseCarReturn {
  cars: ICar[];
  selectedCar: ICar | null;
  loading: boolean;
  error: string | null;
  hasCarData: boolean;
  saveCar: (carData: ICarFormData) => Promise<void>;
  updateKm: (carId: string, newKm: number) => Promise<void>;
  selectCar: (carId: string) => void;
  deleteCar: (carId: string) => Promise<void>;
  clearError: () => void;
  refreshCars: () => Promise<void>;
  canAddMoreCars: boolean;
}

export const useCar = (): IUseCarReturn => {
  const {
    cars,
    selectedCar,
    loading,
    error,
    saveCar,
    updateKm,
    loadCars,
    selectCar,
    deleteCar,
    clearError,
    canAddMoreCars
  } = useCarContext();

  // Mock current user ID - will come from auth context later
  const getCurrentUserId = (): string => {
    return 'user_demo_123';
  };

  // Auto-load cars data on mount
  useEffect(() => {
    const userId = getCurrentUserId();
    loadCars(userId);
  }, [loadCars]);

  // Helper to refresh cars data
  const refreshCars = async (): Promise<void> => {
    const userId = getCurrentUserId();
    await loadCars(userId);
  };

  // Check if we have any car data
  const hasCarData = cars.length > 0;

  return {
    cars,
    selectedCar,
    loading,
    error,
    hasCarData,
    saveCar,
    updateKm,
    selectCar,
    deleteCar,
    clearError,
    refreshCars,
    canAddMoreCars
  };
};