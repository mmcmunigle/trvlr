import { create } from 'zustand';
import { DateValue } from '@mantine/dates';
import { CountryName } from '../types/CountryName';

interface TripStore {
  country: CountryName | null;
  dates: [DateValue, DateValue] | null;
  setDates: (dates: [DateValue, DateValue]) => void;
  setCountry: (country: CountryName | null) => void;
}

const useTripStore = create<TripStore>((set) => ({
  country: null,
  dates: null,
  setDates: (dates: [DateValue, DateValue]) => set((store) => ({ ...store, dates })),
  setCountry: (country: CountryName | null) => set((store) => ({ ...store, country })),
}));

export default useTripStore;
