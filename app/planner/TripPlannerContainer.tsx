'use client';

import React from 'react';
import { Grid, Stack } from '@mantine/core';
import InteractiveMap from './Map/InteractiveMap';
import TripInputPanel from './TripInputPanel';
import TripOverview from './TripOverview';

const TripPlannerContainer = () => {
  return (
    <Grid mt="md" m="md">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <TripInputPanel />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Stack>
          <TripOverview />
          {/* <InteractiveMap /> */}
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default TripPlannerContainer;
