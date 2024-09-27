import { useState } from 'react';
import { Box, Button, Group, Paper, Stack, Stepper } from '@mantine/core';

const PlanStepper = () => {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const onStepClick = (step: number) => {
    setActive(step);
  };

  return (
    <Paper shadow="xl" p="lg" h="80px">
      <Box>
        <Stepper
          color="var(--mantine-color-persian-green-5)"
          active={active}
          onStepClick={onStepClick}
        >
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
