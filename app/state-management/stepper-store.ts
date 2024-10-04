import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export enum TripStep {
  TRIP_DETAILS,
  PREFERENCES,
  DESTINATIONS,
  ACTIVITIES,
  TRANSPORTATION,
  FINAL_REIVEW,
}

interface StepStore {
  step: TripStep;
  setStep: (step: TripStep) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const useStepperStore = create<StepStore, [['zustand/persist', StepStore]]>(
  persist(
    (set, get) => ({
      step: 0,
      setStep: (step: TripStep) => set(() => ({ step: step })),
      nextStep: () =>
        set((store) => ({
          step: store.step < Object.keys(TripStep).length ? store.step + 1 : store.step,
        })),
      prevStep: () =>
        set((store) => ({
          step: store.step > 0 ? store.step - 1 : store.step,
        })),
    }),
    {
      name: 'trip-destinations', // Name of the storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useStepperStore;
