// Global interfaces for the application
export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface ICar {
  id: string;
  userId: string;
  brand: string;
  model: string;
  year: number;
  currentKm: number;
  fuelType: 'diesel' | 'gasoline';
  licensePlate?: string;
  createdAt: Date;
}

