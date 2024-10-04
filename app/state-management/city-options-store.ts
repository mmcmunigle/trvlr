import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CityOptionStore {
  cities: string[];
  setCities: (cities: string[]) => void;
}

const useCityOptionStore = create<CityOptionStore, [['zustand/persist', CityOptionStore]]>(
  persist(
    (set, get) => ({
      cities: [],
      setCities: (cities: string[]) => set(() => ({ cities })),
    }),
    {
      name: 'trip-city-options', // Name of the storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCityOptionStore;
