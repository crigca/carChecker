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

export interface IMaintenanceInterval {
  km?: number;
  months?: number;
}

export interface IMaintenanceAlert {
  id: string;
  carId: string;
  type: TMaintenanceType;
  scheduledDate: Date;
  customDate?: Date;
  isCustomRescheduled: boolean;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface IMaintenanceType {
  value: 'oil' | 'fuelFilter' | 'cabinFilter' | 'airFilter' | 'timingBelt' | 'tireRotation' | 'vtv';
  label: string;
  intervalKm?: number;
  intervalMonths?: number;
}

export interface IFuelType {
  value: 'diesel' | 'gasoline';
  label: string;
}