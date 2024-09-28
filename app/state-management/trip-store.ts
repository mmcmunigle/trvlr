import { create } from 'zustand';
import { CountryName } from '../types/CountryName';

interface TripStore {
  country: CountryName | null;
  setCountry: (country: CountryName) => void;
}

const useTripStore = create<TripStore>((set) => ({
  country: null,
  setCountry: (country: CountryName) => set(() => ({ country })),
}));

export default useTripStore;
