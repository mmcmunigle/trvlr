'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Box, Button, Center, Group, Stack, Title } from '@mantine/core';
import { MapsLibraryProvider } from '@/app/MapsLibraryContext';
import useStepperStore, { TripStep } from '../../state-management/stepper-store';
import StepDetailsContainer from './steps/StepDetailsContainer';

const TripInputPanel = () => {
  const step = useStepperStore((store) => store.step);
  const nextStep = useStepperStore((store) => store.nextStep);
  const prevStep = useStepperStore((store) => store.prevStep);

  const titleMap = {
    [TripStep.TRIP_DETAILS]: "Let's get this trip started!",
    [TripStep.PREFERENCES]: 'Answer a few questions to get personalized suggestions',
    [TripStep.DESTINATIONS]: 'Where do you want to visit?',
    [TripStep.ACTIVITIES]: 'Select any number of activities',
    [TripStep.TRANSPORTATION]: "Let's figure out the best way to get around",
    [TripStep.FINAL_REIVEW]: 'Take a few minute to review your trip!',
  };

  return (
    <Center h="100%">
      <Stack justify="space-between" h="100%" align="center" pt="1rem" w="100%">
        <Title ta="center" maw="800px" h="3rem">
          {titleMap[step]}
        </Title>
        <Box w="95%" h="calc(100% - 7rem)">
          <Center h="100%">
            <MapsLibraryProvider>
              <APIProvider apiKey="AIzaSyBMUjX4kLhW6yk4jWga99Zqg9CeAbuRmzo">
                <StepDetailsContainer />
              </APIProvider>
            </MapsLibraryProvider>
          </Center>
        </Box>

        <Group justify="center" pb="1rem" h="4rem">
          <Button
            onClick={prevStep}
            variant="default"
            disabled={step === TripStep.TRIP_DETAILS}
            leftSection={<MdChevronLeft />}
          >
            Previous
          </Button>
          <Button
            bg="primary"
            onClick={nextStep}
            disabled={step === TripStep.FINAL_REIVEW}
            rightSection={<MdChevronRight />}
          >
            Next Step
          </Button>
        </Group>
      </Stack>
    </Center>
  );
};

export default TripInputPanel;
