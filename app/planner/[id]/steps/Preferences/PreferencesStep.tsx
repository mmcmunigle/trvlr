'use client';

import React, { useState } from 'react';
import { Box, Chip, Group, RangeSlider, Slider, Stack, Text } from '@mantine/core';

const PreferencesStep = () => {
  const [value, setValue] = useState(['react']);

  return (
    <Stack maw="600px" gap="xl">
      <Box>
        <Text size="lg" mb="sm">
          Activity Level
        </Text>
        <Slider
          label={null}
          max={5}
          min={1}
          defaultValue={3}
          marks={[
            { value: 1, label: 'Laid Back' },
            { value: 3, label: 'Some of Both' },
            { value: 5, label: 'Adventurous' },
          ]}
        />
      </Box>

      <Box mt="xl">
        <Text size="lg" mb="sm">
          Travel Style
        </Text>
        <Slider
          label={null}
          max={5}
          min={1}
          defaultValue={3}
          marks={[
            { value: 1, label: 'Popular Spots' },
            { value: 3, label: 'Some of Both' },
            { value: 5, label: 'Off The Beaten Path' },
          ]}
        />
      </Box>

      <Box>
        <Text size="lg" mt="xl" mb="md">
          Interests
        </Text>
        <Chip.Group multiple value={value} onChange={setValue}>
          <Group>
            <Chip value="adventure">Adventurous Activities</Chip>
            <Chip value="classes">Classes</Chip>
            <Chip value="tours">Historical Tours</Chip>
            <Chip value="sights">Sight Seeing</Chip>
            <Chip value="shopping">Shopping</Chip>
            <Chip value="hiking">Hiking</Chip>
            <Chip value="tasting">Food Tasting</Chip>
            <Chip value="beer">Breweries</Chip>
            <Chip value="wine">Wineries</Chip>
          </Group>
        </Chip.Group>
      </Box>
    </Stack>
  );
};

export default PreferencesStep;
