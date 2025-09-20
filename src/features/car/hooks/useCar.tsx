import { useState, useCallback } from 'react';
import { ICar } from '../../../types/global';
import { carService } from '../services/carService';

interface IUseCarReturn {
  car: ICar | null;
  loading: boolean;
  error: string | null;
  saveCar: (carData: Omit<ICar, 'id' | 'createdAt'>) => Promise<void>;
  loadCar: (userId: string) => Promise<void>;
  updateKm: (newKm: number) => Promise<void>;
}

export const useCar = (): IUseCarReturn => {
  const [car, setCar] = useState<ICar | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveCar = useCallback(async (carData: Omit<ICar, 'id' | 'createdAt'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const savedCar = await carService.save(carData);
      setCar(savedCar);
    } catch (err) {
      setError('Failed to save car data');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCar = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const loadedCar = await carService.load(userId);
      setCar(loadedCar);
    } catch (err) {
      setError('Failed to load car data');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateKm = useCallback(async (newKm: number) => {
    if (!car) return;
    
    setLoading(true);
    try {
      const updatedCar = await carService.updateKm(car.id, newKm);
      setCar(updatedCar);
    } catch (err) {
      setError('Failed to update kilometers');
    } finally {
      setLoading(false);
    }
  }, [car]);

  return {
    car,
    loading,
    error,
    saveCar,
    loadCar,
    updateKm
  };
};