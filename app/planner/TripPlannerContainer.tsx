'use client';

import { Box, Card, Grid, Stack } from '@mantine/core';
import InteractiveMap from './map/InteractiveMap';
import TripOverview from './summary/TripOverview';
import TripInputPanel from './TripInputPanel';

const TripPlannerContainer = () => {
  return (
    <Grid gutter={0} h="calc(100% - 80px)">
      <Grid.Col span={{ base: 12, md: 7 }}>
        <TripInputPanel />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Card shadow="sm" h="calc(100% - 20px)" m="10px" radius="lg">
          <Stack justify="space-between" h="100%" gap={0}>
            <Box h="50%">
              <InteractiveMap />
            </Box>
            <Box h="50%">
              <TripOverview />
            </Box>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default TripPlannerContainer;
