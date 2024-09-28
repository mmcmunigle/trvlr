import useStepperStore, { TripStep } from '../../state-management/stepper-store';
import PreferencesStep from './PreferencesStep';
import TripDetailsStep from './TripDetailsStep';

const StepContainer = () => {
  const step = useStepperStore((store) => store.step);

  switch (step) {
    case TripStep.TRIP_DETAILS:
      return <TripDetailsStep />;
    case TripStep.PREFERENCES:
      return <PreferencesStep />;
    case TripStep.DESTINATIONS:
      return <>Trip Details</>;
    case TripStep.ACTIVITIES:
      return <>Trip Details</>;
    case TripStep.TRANSPORTATION:
      return <>Trip Details</>;
    case TripStep.FINAL_REIVEW:
      return <>Trip Details</>;
    default:
      return null;
  }
};

export default StepContainer;
