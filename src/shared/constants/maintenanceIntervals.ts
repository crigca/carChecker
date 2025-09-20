import { IMaintenanceInterval } from '../../types/global';

export const MAINTENANCE_INTERVALS: Record<string, IMaintenanceInterval> = {
  oil: { km: 10000, months: 12 },
  fuelFilter: { km: 20000, months: 24 },
  cabinFilter: { km: 20000, months: 24 },
  airFilter: { km: 20000, months: 24 },
  timingBelt: { km: 50000, months: null },
  tireRotation: { km: 10000, months: null },
  vtv: { months: 12, km: null }
};

export const MAINTENANCE_LABELS: Record<string, string> = {
  oil: 'Oil Change',
  fuelFilter: 'Fuel Filter',
  cabinFilter: 'Cabin Filter',
  airFilter: 'Air Filter',
  timingBelt: 'Timing Belt',
  tireRotation: 'Tire Rotation',
  vtv: 'Technical Inspection (VTV)'
};