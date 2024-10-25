import { create } from 'zustand';
import { DestinationWithDetails } from '../types/DestinationWithDetails';

interface DestinationStore {
  destinations: { name: string; id: number }[];
  destinationDetails: DestinationWithDetails[];
  addDestination: (destination: DestinationWithDetails) => void;
  removeDestination: (id: number) => void;
  updateDestination: (destination: DestinationWithDetails) => void;
  setDestinations: (destinations: DestinationWithDetails[]) => void;
}

const useDestinationStore = create<DestinationStore>((set) => ({
  destinations: [],
  destinationDetails: [],

  addDestination: (destination: DestinationWithDetails) =>
    set((store) => ({
      destinations: [...store.destinations, { name: destination.name, id: destination.id }],
      destinationDetails: [...store.destinationDetails, destination],
    })),

  removeDestination: (id: number) =>
    set((store) => ({
      destinations: store.destinations.filter((d) => d.id !== id),
      destinationDetails: store.destinationDetails.filter((d) => d.id !== id),
    })),

  updateDestination: (destination: DestinationWithDetails) =>
    set((store) => {
      const index = store.destinations.findIndex((d) => d.id === destination.id);
      store.destinations[index] = destination;
      return { destinations: store.destinations };
    }),

  setDestinations: (destinations: DestinationWithDetails[]) =>
    set(() => ({
      destinations: destinations.map((dest) => ({ id: dest.id, name: dest.name })),
      destinationDetails: destinations,
    })),
}));

export default useDestinationStore;
