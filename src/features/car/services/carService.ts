import type { ICar } from '../../../types/global';
import type { ICarFormData } from '../types/carTypes';
import { MockStorage } from '../../../shared/services/mockStorage';

class CarService {
  private readonly ENTITY_KEY = 'cars';
  private readonly MAX_CARS_PER_USER = 3;

  // Generate unique ID for new car
  private generateId(): string {
    return `car_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Save new car data
  async save(carData: ICarFormData, userId: string): Promise<ICar> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if user can add more cars
    const existingCars = await this.loadAll(userId);
    if (existingCars.length >= this.MAX_CARS_PER_USER) {
      throw new Error(`No puedes tener más de ${this.MAX_CARS_PER_USER} vehículos`);
    }

    const newCar: ICar = {
      id: this.generateId(),
      userId,
      brand: carData.brand,
      model: carData.model,
      year: carData.year,
      currentKm: carData.currentKm,
      fuelType: carData.fuelType,
      licensePlate: carData.licensePlate,
      createdAt: new Date()
    };

    // Save to array of cars
    const updatedCars = [...existingCars, newCar];
    MockStorage.save(this.ENTITY_KEY, updatedCars, userId);
    return newCar;
  }

  // Load all cars for user
  async loadAll(userId: string): Promise<ICar[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const cars = MockStorage.load<ICar[]>(this.ENTITY_KEY, userId) || [];
    return cars;
  }

  // Load single car by ID
  async load(carId: string, userId: string): Promise<ICar | null> {
    const cars = await this.loadAll(userId);
    return cars.find(car => car.id === carId) || null;
  }

  // Update car kilometers
  async updateKm(carId: string, userId: string, newKm: number): Promise<ICar> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const cars = await this.loadAll(userId);
    const carIndex = cars.findIndex(car => car.id === carId);

    if (carIndex === -1) {
      throw new Error('Vehículo no encontrado');
    }

    const updatedCar: ICar = {
      ...cars[carIndex],
      currentKm: newKm
    };

    cars[carIndex] = updatedCar;
    MockStorage.save(this.ENTITY_KEY, cars, userId);
    return updatedCar;
  }

  // Update complete car data
  async update(carId: string, userId: string, carData: ICarFormData): Promise<ICar> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const cars = await this.loadAll(userId);
    const carIndex = cars.findIndex(car => car.id === carId);

    if (carIndex === -1) {
      throw new Error('Vehículo no encontrado');
    }

    const updatedCar: ICar = {
      ...cars[carIndex],
      brand: carData.brand,
      model: carData.model,
      year: carData.year,
      currentKm: carData.currentKm,
      fuelType: carData.fuelType,
      licensePlate: carData.licensePlate
    };

    cars[carIndex] = updatedCar;
    MockStorage.save(this.ENTITY_KEY, cars, userId);
    return updatedCar;
  }

  // Delete single car
  async delete(carId: string, userId: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const cars = await this.loadAll(userId);
    const filteredCars = cars.filter(car => car.id !== carId);
    MockStorage.save(this.ENTITY_KEY, filteredCars, userId);
  }

  // Check if user can add more cars
  async canAddMoreCars(userId: string): Promise<boolean> {
    const cars = await this.loadAll(userId);
    return cars.length < this.MAX_CARS_PER_USER;
  }
}

export const carService = new CarService();