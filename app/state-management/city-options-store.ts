import { create } from 'zustand';

interface CityOptionStore {
  cities: string[];
  setCities: (cities: string[]) => void;
}

const useCityOptionStore = create<CityOptionStore>((set) => ({
  cities: [],
  setCities: (cities: string[]) => set(() => ({ cities })),
}));

export default useCityOptionStore;
