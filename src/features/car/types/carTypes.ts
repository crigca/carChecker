// Import global car interface
import type { ICar } from '../../../types/global';

// Car feature specific types
export interface ICarFormData {
  brand: string;
  model: string;
  year: number;
  currentKm: number;
  fuelType: 'diesel' | 'gasoline';
  licensePlate?: string;
}

export interface ICarFormErrors {
  brand?: string;
  model?: string;
  year?: string;
  currentKm?: string;
  fuelType?: string;
  licensePlate?: string;
  general?: string;
}

export interface ICarContext {
  cars: ICar[];
  selectedCar: ICar | null;
  loading: boolean;
  error: string | null;
  saveCar: (carData: ICarFormData) => Promise<void>;
  updateKm: (carId: string, newKm: number) => Promise<void>;
  loadCars: (userId: string) => Promise<void>;
  selectCar: (carId: string) => void;
  deleteCar: (carId: string) => Promise<void>;
  clearError: () => void;
  canAddMoreCars: boolean;
}

