import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { DateValue } from '@mantine/dates';
import { CountryName } from '../types/CountryName';

interface TripStore {
  country: CountryName | null;
  startDate: DateValue | null;
  endDate: DateValue | null;
  setDates: (dates: [DateValue, DateValue]) => void;
  setCountry: (country: CountryName | null) => void;
}

const useTripStore = create<TripStore, [['zustand/persist', TripStore]]>(
  persist(
    (set, get) => ({
      country: null,
      startDate: null,
      endDate: null,
      setDates: (dates: [DateValue, DateValue]) =>
        set((store) => ({ ...store, startDate: dates[0], endDate: dates[1] })),
      setCountry: (country: CountryName | null) => set((store) => ({ ...store, country })),
    }),
    {
      name: 'trip-details-store', // Name of the storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTripStore;
