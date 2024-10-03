import { Destination } from '@prisma/client';
import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';

interface DestinationStore {
  destinations: Partial<Destination>[];
  addDestination: (destination: Partial<Destination>) => void;
  removeDestination: (name: string) => void;
  setDestinations: (destination: Destination[]) => void;
}

const useDestinationStore = create<DestinationStore, [['zustand/persist', DestinationStore]]>(
  persist(
    (set, get) => ({
      destinations: [],

      addDestination: (destination: Partial<Destination>) =>
        set((state) => ({ destinations: [...state.destinations, destination] })),

      removeDestination: (name: string) =>
        set((store) => ({
          destinations: store.destinations.filter((d) => d.name !== name),
        })),

      setDestinations: (destinations: Destination[]) => set(() => ({ destinations })),
    }),
    {
      name: 'trip-destinations', // Name of the storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDestinationStore;
