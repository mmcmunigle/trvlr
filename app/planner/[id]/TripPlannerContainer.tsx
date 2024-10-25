import { Box, Card, Grid, GridCol, Stack } from '@mantine/core';
import InteractiveMap from './map/InteractiveMap';
import TripOverview from './summary/TripOverview';
import TripInputPanel from './TripInputPanel';

const TripPlannerContainer = () => {
  return (
    <Grid gutter={0} h="calc(100% - 80px)">
      <GridCol span={{ base: 12, md: 7 }} h="100%">
        <TripInputPanel />
      </GridCol>
      <GridCol span={{ base: 12, md: 5 }}>
        <Card shadow="sm" h="calc(100% - 20px)" m="10px" radius="lg">
          <Stack justify="space-between" h="100%" gap={0}>
            <Box h="40%">
              <InteractiveMap />
            </Box>
            <Box h="60%" style={{ overflowY: 'auto' }}>
              <TripOverview />
            </Box>
          </Stack>
        </Card>
      </GridCol>
    </Grid>
  );
};

export default TripPlannerContainer;
