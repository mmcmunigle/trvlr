import { Destination } from '@prisma/client';
import { create } from 'zustand';

interface DestinationStore {
  destinations: Partial<Destination>[];
  addDestination: (destination: Partial<Destination>) => void;
  removeDestination: (name: string) => void;
  setDestinations: (destination: Destination[]) => void;
}

const useDestinationStore = create<DestinationStore>((set) => ({
  destinations: [],
  addDestination: (destination: Partial<Destination>) =>
    set((store) => {
      const index = store.destinations.findIndex((d) => d.name === destination.name);
      if (index === -1) {
        store.destinations.push(destination);
        return { destinations: Array.from(store.destinations) };
      } else {
        return { destinations: store.destinations };
      }
    }),
  removeDestination: (name: string) =>
    set((store) => {
      const index = store.destinations.findIndex((d) => d.name === name);
      store.destinations.slice(index, 1);
      return { destinations: store.destinations };
    }),
  setDestinations: (destinations: Destination[]) => set(() => ({ destinations })),
}));

export default useDestinationStore;
