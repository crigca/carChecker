// Utility functions for date calculations
export const calculateNextMaintenanceDate = (
  lastServiceDate: Date,
  intervalMonths: number
): Date => {
  const nextDate = new Date(lastServiceDate);
  nextDate.setMonth(nextDate.getMonth() + intervalMonths);
  return nextDate;
};

export const calculateNextMaintenanceKm = (
  currentKm: number,
  intervalKm: number
): number => {
  return currentKm + intervalKm;
};

export const isMaintenanceDue = (
  currentKm: number,
  currentDate: Date,
  nextDueKm?: number,
  nextDueDate?: Date
): boolean => {
  const kmDue = nextDueKm ? currentKm >= nextDueKm : false;
  const dateDue = nextDueDate ? currentDate >= nextDueDate : false;
  
  return kmDue || dateDue;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getDaysUntilDue = (dueDate: Date): number => {
  const today = new Date();
  const timeDiff = dueDate.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};