import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import { Carousel } from '@mantine/carousel';
import { ActionIcon, Card, Group, Image, Stack, Title, Tooltip } from '@mantine/core';
import useDestinationStore from '@/app/state-management/destination-store';
import useTripStore from '@/app/state-management/trip-store';

type City = {
  name: string;
  description: string;
};

const CityOptionCarousel = () => {
  const country = useTripStore((store) => store.country);
  const [cities, setCities] = useState<City[]>([]);
  const [photos, setPhotots] = useState<string[]>([]);
  const addDestination = useDestinationStore((store) => store.addDestination);

  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !cities.length) return;

    const getPlaces = () => {
      const uris: string[] = [];
      cities.forEach(async (city) => {
        await places.Place.searchByText({
          fields: ['photos'],
          textQuery: `${city.name}, ${country}`,
        }).then((resp) => {
          if (resp.places[0].photos?.length)
            uris.push(resp.places[0].photos![0].getURI({ maxHeight: 256 }));
          else uris.push('');

          if (uris.length === cities.length) setPhotots(uris);
        });
      });
    };

    getPlaces();
  }, [places, cities]);

  useEffect(() => {
    const getCities = async () => {
      await axios.post('/api/generate/city', { country, days: 10 }).then((resp) => {
        if (!cities.length) {
          setCities(resp.data);
        } else {
          console.log('Duplicate Call Detected');
        }
      });
    };
    getCities();
  }, []);

  const removeCityOption = (name: string) => {
    setCities(cities.filter((city) => city.name !== name));
  };

  return (
    <Carousel
      controlSize={42}
      height={300}
      slideGap={{ base: 0, sm: 'md' }}
      loop
      align="start"
      slideSize={{ base: '100%', sm: '50%', lg: '33.33%' }}
    >
      {!!photos.length &&
        cities!.map((city, index) => (
          <Carousel.Slide key={index}>
            <Card shadow="md" h="260px" radius="lg" p={0}>
              <Stack h="100%">
                <Image src={photos[index]} w="100%" mih="200px" />

                <Group w="100%" justify="space-between" px="lg">
                  <Tooltip label="Interested">
                    <ActionIcon
                      variant="light"
                      radius="xl"
                      onClick={() => {
                        addDestination(city);
                        removeCityOption(city.name);
                      }}
                    >
                      <IconPlus fontSize={20} />
                    </ActionIcon>
                  </Tooltip>
                  <Title order={5}>{city.name}</Title>
                  <Tooltip label="Not Interested">
                    <ActionIcon
                      variant="light"
                      radius="xl"
                      color="red"
                      onClick={() => removeCityOption(city.name)}
                    >
                      <MdClose size="xl" />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Stack>
            </Card>
          </Carousel.Slide>
        ))}
    </Carousel>
  );
};

export default CityOptionCarousel;
