import { useEffect, useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { Carousel } from '@mantine/carousel';
import {
  Box,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { getCityOptions } from '@/app/services/cityService';
import useDestinationStore from '@/app/state-management/destination-store';
import useTripStore from '@/app/state-management/trip-store';
import { CityWithPhotos } from '@/app/types/CityWithPhotos';
import CarouselSkeleton from './CarouselSkeleton';

const CityOptionCarousel = () => {
  const country = useTripStore((store) => store.country);
  const [cities, setCities] = useState<CityWithPhotos[]>([]);
  const [loading, setLoading] = useState(true);
  const addDestination = useDestinationStore((store) => store.addDestination);

  useEffect(() => {
    const getOptions = async () => {
      const cityOptions = await getCityOptions(country!);
      setCities(cityOptions);
      setLoading(false);
    };
    setLoading(true);
    getOptions();
  }, []);

  const removeCityOption = (name: string) => {
    setCities(cities.filter((city) => city.name !== name));
  };

  return (
    <Carousel
      controlSize={40}
      height={450}
      slideGap={{ base: 0, sm: 'md' }}
      align="start"
      w="100%"
      slideSize={{ base: '100%', sm: '50%', lg: '33.33%' }}
    >
      {loading && <CarouselSkeleton />}
      {!loading &&
        cities!.map((city, index) => (
          <Carousel.Slide key={index}>
            <Card shadow="md" h="405px" radius="lg" p={0} mt={30}>
              <Stack h="100%" gap="sm">
                <Image src={city.photos?.length ? city.photos[0].link : null} mih="250px" />

                <Box>
                  <Group justify="space-between" px="lg">
                    <Tooltip label="Interested">
                      <Button
                        variant="light"
                        radius="md"
                        fz="xl"
                        p="xs"
                        onClick={() => {
                          addDestination(city);
                          removeCityOption(city.name);
                        }}
                      >
                        <MdAdd />
                      </Button>
                    </Tooltip>

                    <Title order={5}>{city.name}</Title>

                    <Tooltip label="Not Interested">
                      <Button
                        variant="light"
                        radius="md"
                        fz="xl"
                        p="sm"
                        color="red"
                        onClick={() => removeCityOption(city.name)}
                      >
                        <MdClose />
                      </Button>
                    </Tooltip>
                  </Group>
                  <Divider m="xs" />
                  <Text ta="center" size="sm" px="xs" c="dimmed">
                    {city.description}
                  </Text>
                </Box>
              </Stack>
            </Card>
          </Carousel.Slide>
        ))}
    </Carousel>
  );
};

export default CityOptionCarousel;
