export interface IOilChange {
  id: string;
  carId: string;
  date: Date;
  kmAtChange: number;
  oilBrand: string;
  oilLiters: number;
  filterBrand: string;
  filterModel: string;
  nextDueDate: Date;
  nextDueKm: number;
  notes?: string;
}

export interface IFilterChange {
  id: string;
  carId: string;
  filterType: 'air' | 'fuel' | 'cabin';
  date: Date;
  kmAtChange: number;
  filterBrand: string;
  filterModel: string;
  nextDueKm: number;
  nextDueDate: Date;
  notes?: string;
}

export interface ITireService {
  id: string;
  carId: string;
  serviceType: 'replacement' | 'rotation';
  date: Date;
  kmAtService: number;
  notes?: string;
  nextRotationKm?: number;
}

export interface IVTV {
  id: string;
  carId: string;
  inspectionDate: Date;
  expirationDate: Date;
  place?: string;
  passed: boolean;
  notes?: string;
}

export interface ITimingBelt {
  id: string;
  carId: string;
  replacementDate: Date;
  kmAtReplacement: number;
  brand: string;
  model?: string;
  nextDueKm: number;
  notes?: string;
}