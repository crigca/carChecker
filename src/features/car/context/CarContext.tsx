import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import type { ICar } from '../../../types/global';
import type { ICarFormData } from '../types/carTypes';
import { carService } from '../services/carService';

// Context state interface
interface ICarState {
  cars: ICar[];
  selectedCar: ICar | null;
  loading: boolean;
  error: string | null;
}

// Action types
interface ICarAction {
  type: 'SET_LOADING' | 'SET_CARS' | 'SET_SELECTED_CAR' | 'SET_ERROR' | 'CLEAR_ERROR' | 'ADD_CAR' | 'UPDATE_CAR' | 'DELETE_CAR';
  payload?: any;
}

// Context interface
interface ICarContextValue extends ICarState {
  saveCar: (carData: ICarFormData) => Promise<void>;
  updateKm: (carId: string, newKm: number) => Promise<void>;
  loadCars: (userId: string) => Promise<void>;
  selectCar: (carId: string) => void;
  deleteCar: (carId: string) => Promise<void>;
  clearError: () => void;
  canAddMoreCars: boolean;
}

// Initial state
const initialState: ICarState = {
  cars: [],
  selectedCar: null,
  loading: false,
  error: null
};

// Reducer function
const carReducer = (state: ICarState, action: ICarAction): ICarState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
        error: null
      };

    case 'SET_CARS':
      return {
        ...state,
        cars: action.payload,
        selectedCar: action.payload.length > 0 ? action.payload[0] : null,
        loading: false,
        error: null
      };

    case 'SET_SELECTED_CAR':
      return {
        ...state,
        selectedCar: action.payload
      };

    case 'ADD_CAR':
      return {
        ...state,
        cars: [...state.cars, action.payload],
        selectedCar: action.payload,
        loading: false,
        error: null
      };

    case 'UPDATE_CAR':
      return {
        ...state,
        cars: state.cars.map(car =>
          car.id === action.payload.id ? action.payload : car
        ),
        selectedCar: state.selectedCar?.id === action.payload.id ? action.payload : state.selectedCar,
        loading: false,
        error: null
      };

    case 'DELETE_CAR':
      const filteredCars = state.cars.filter(car => car.id !== action.payload);
      return {
        ...state,
        cars: filteredCars,
        selectedCar: state.selectedCar?.id === action.payload
          ? (filteredCars.length > 0 ? filteredCars[0] : null)
          : state.selectedCar,
        loading: false,
        error: null
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

// Create context
const CarContext = createContext<ICarContextValue | undefined>(undefined);

// Provider component
interface ICarProviderProps {
  children: ReactNode;
}

export const CarProvider = ({ children }: ICarProviderProps) => {
  const [state, dispatch] = useReducer(carReducer, initialState);

  // Mock current user ID - will come from auth later
  const getCurrentUserId = (): string => {
    return 'user_demo_123';
  };

  const saveCar = useCallback(async (carData: ICarFormData): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const userId = getCurrentUserId();
      const savedCar = await carService.save(carData, userId);
      dispatch({ type: 'ADD_CAR', payload: savedCar });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Error al guardar vehículo' });
    }
  }, []);

  const updateKm = useCallback(async (carId: string, newKm: number): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const userId = getCurrentUserId();
      const updatedCar = await carService.updateKm(carId, userId, newKm);
      dispatch({ type: 'UPDATE_CAR', payload: updatedCar });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al actualizar kilómetros' });
    }
  }, []);

  const loadCars = useCallback(async (userId: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const cars = await carService.loadAll(userId);
      dispatch({ type: 'SET_CARS', payload: cars });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar vehículos' });
    }
  }, []);

  const selectCar = useCallback((carId: string): void => {
    const car = state.cars.find(c => c.id === carId);
    if (car) {
      dispatch({ type: 'SET_SELECTED_CAR', payload: car });
    }
  }, [state.cars]);

  const deleteCar = useCallback(async (carId: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const userId = getCurrentUserId();
      await carService.delete(carId, userId);
      dispatch({ type: 'DELETE_CAR', payload: carId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al eliminar vehículo' });
    }
  }, []);

  const clearError = useCallback((): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value: ICarContextValue = {
    ...state,
    saveCar,
    updateKm,
    loadCars,
    selectCar,
    deleteCar,
    clearError,
    canAddMoreCars: state.cars.length < 3
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
};

// Custom hook to use car context
export const useCarContext = (): ICarContextValue => {
  const context = useContext(CarContext);
  
  if (context === undefined) {
    throw new Error('useCarContext must be used within a CarProvider');
  }
  
  return context;
};