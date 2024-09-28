import React from 'react';
import { Grid, Stack } from '@mantine/core';
import PlanStepper from './PlanStepper';
import TripPlannerContainer from './TripPlannerContainer';

const TripPlannerPage = () => {
  return (
    <Stack h="100vh" gap={0}>
      <PlanStepper />
      <TripPlannerContainer />
    </Stack>
  );
};

export default TripPlannerPage;
