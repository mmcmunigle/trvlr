'use client';

import { Box, Paper, Stepper } from '@mantine/core';
import useStepperStore from '../../state-management/stepper-store';

const PlanStepper = () => {
  const setStep = useStepperStore((store) => store.setStep);
  const step = useStepperStore((store) => store.step);

  // const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const onStepClick = (step: number) => {
    setStep(step);
  };

  return (
    <Paper shadow="xl" p="lg" h="80px">
      <Box>
        <Stepper active={step} onStepClick={onStepClick}>
          <Stepper.Step label="Trip Details" description="When and where" />
          <Stepper.Step label="Preferences" description="Travel style" />
          <Stepper.Step label="Destinations" description="Choose cities" />
          <Stepper.Step label="Activities" description="Things to do" />
          <Stepper.Step label="Transportation" description="How to get around" />
          <Stepper.Step label="Final Review" description="Finalize trip details" />
        </Stepper>
      </Box>
    </Paper>
  );
};

export default PlanStepper;
