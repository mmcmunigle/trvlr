'use client';

import { useEffect, useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { Box, Button, Card, Divider, Group, SimpleGrid, Text, Title, Tooltip } from '@mantine/core';
import useActivityManager from '@/app/hooks/useActivityManager';
import { AcivityGtpResponse, getActivityRecommendations } from '@/app/services/activityRecService';

interface Props {
  destination: { name: string; id: number };
}

const ActivitySelectionArea = ({ destination }: Props) => {
  const { handleAddActivity } = useActivityManager(destination.id);
  const [places, setPlaces] = useState<Partial<AcivityGtpResponse>[]>([]);
  const removePlaceOption = (title: string) => {
    setPlaces(places.filter((activity) => activity.title !== title));
  };

  useEffect(() => {
    setPlaces([]);
    const getActivities = async () => {
      const resp = await getActivityRecommendations(destination.name);
      setPlaces(resp);
    };
    console.log(process.env.TRIP_ADVISOR_API_KEY);
    getActivities();
  }, [destination]);

  return (
    <Box h="100%" style={{ overflowY: 'auto', alignContent: 'center' }}>
      {/* <Center h="100%"> */}{' '}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} ta="center">
        {places.slice(0, 9).map((place) => (
          <Card key={place.title} shadow="sm" radius="lg" p="sm">
            {/* <Image src={place.photos?.length ? place.photos[0].link : null} mih="200px" /> */}
            <Box>
              <Group justify="space-between" px="xs" gap={0}>
                <Tooltip label="Interested">
                  <Button
                    maw="15%"
                    variant="subtle"
                    radius="md"
                    fz="xl"
                    p="xs"
                    onClick={() => {
                      handleAddActivity({ title: place.title, destinationId: destination.id });
                      removePlaceOption(place.title!);
                    }}
                  >
                    <MdAdd />
                  </Button>
                </Tooltip>

                <Title ta="center" maw="70%" order={5}>
                  {place.title}
                </Title>

                <Tooltip label="Not Interested">
                  <Button
                    maw="15%"
                    variant="subtle"
                    radius="md"
                    fz="xl"
                    p="sm"
                    color="red"
                    onClick={() => removePlaceOption(place.title!)}
                  >
                    <MdClose />
                  </Button>
                </Tooltip>
              </Group>
              <Divider m="xs" />
              <Text ta="center" size="sm" px="xs" c="dimmed">
                {place.description}
              </Text>
            </Box>
          </Card>

          // <Card key={activity.title}>{activity.title}</Card>;
        ))}
      </SimpleGrid>
      {/* </Center> */}
    </Box>
  );
};

export default ActivitySelectionArea;
