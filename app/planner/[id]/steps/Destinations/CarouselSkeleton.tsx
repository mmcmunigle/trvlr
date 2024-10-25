import React from 'react';
import { Carousel } from '@mantine/carousel';
import { Card, Skeleton } from '@mantine/core';

const CarouselSkeleton = () => {
  const data = [1, 2, 3];
  return (
    <>
      {data.map((id) => (
        <Carousel.Slide key={id}>
          <Skeleton w="100%">
            <Card shadow="md" h="355px" radius="lg" p={0} mt={30} />
          </Skeleton>
        </Carousel.Slide>
      ))}
    </>
  );
};

export default CarouselSkeleton;
