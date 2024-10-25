import React from 'react';
import Link from 'next/link';
import { Card, Center, SimpleGrid, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'green' }}>
          TRVLR
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Effortlessly plan and organize your dream trip with a smart, easy-to-use travel planner that
        helps you manage every detail of your journey.
      </Text>
      <Center mt="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }}>
          <Link href="/planner/new">
            <Card w="200px" h="200px" shadow="md" radius="lg" className={classes.card}>
              <Center h="100%">
                <Text size="lg" fw={700} ta="center" c="var(--mantine-color-persian-green-5)">
                  Start New Trip
                </Text>
              </Center>
            </Card>
          </Link>
        </SimpleGrid>
      </Center>
    </>
  );
}
