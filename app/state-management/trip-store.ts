import { Trip } from '@prisma/client';
import { create } from 'zustand';
import { DateValue } from '@mantine/dates';
import { CountryName } from '../types/CountryName';

interface TripStore {
  trip: Trip;
  setDates: (dates: [DateValue, DateValue]) => void;
  setCountry: (country: CountryName | null) => void;
  setTrip: (trip: Trip) => void;
}

const useTripStore = create<TripStore>((set) => ({
  trip: {} as Trip,
  setDates: (dates: [DateValue, DateValue]) =>
    set((store) => ({ ...store, startDate: dates[0], endDate: dates[1] })),
  setCountry: (country: CountryName | null) => set((store) => ({ ...store, country })),
  setTrip: (trip: Trip) => set(() => ({ trip })),
}));

export default useTripStore;
