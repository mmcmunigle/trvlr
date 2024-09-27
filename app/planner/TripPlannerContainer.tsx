'use client';

import React from 'react';
import { Box, Card, Divider, Grid, Stack } from '@mantine/core';
import InteractiveMap from './Map/InteractiveMap';
import PlanStepper from './PlanStepper';
import TripInputPanel from './TripInputPanel';
import TripOverview from './TripOverview';

const TripPlannerContainer = () => {
  return (
    <Stack h="100vh" gap={0}>
      <PlanStepper />
      <Grid gutter={0} h="calc(100% - 80px)">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TripInputPanel />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" h="calc(100% - 20px)" m="10px">
            <Stack justify="space-between" h="100%" gap="md">
              <Box h="40%">
                <InteractiveMap />
              </Box>
              <Box h="60%">
                <TripOverview />
              </Box>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default TripPlannerContainer;
