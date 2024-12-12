export interface FilterOptions {
  types: string[];
  currencies: string[];
  countries: string[];
}

export interface FilterState {
  type: string[];
  currency: string[];
  country: string[];
}

export interface FilterSection {
  id: keyof FilterState;
  label: string;
  options: string[];
}