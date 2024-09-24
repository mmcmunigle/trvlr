import { EventInput, formatDate } from '@fullcalendar/core';
import { Accordion, Box, Card, DefaultMantineColor, Flex, Stack, Text, Title } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';
import classes from './SideBar.module.css';

interface Props {
  trip: TripWithDestinations;
}

export const Sidebar = ({ trip }: Props) => {
  //   const eventStore = useContext(eventStoreContext);

  function renderSidebarEvent(event: EventInput) {
    return (
      <li key={event.id}>
        {/* <button onClick={() => eventStore.deleteEvent(event.id!)}>x</button> */}
        <b>
          {formatDate(event.start!, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </b>
        <i>{event.title}</i>
      </li>
    );
  }

  return (
    <Box className={classes.sidebar}>
      <Box px="2em" py="1rem">
        <Title order={5}>Trip Details</Title>
        <Stack gap="md" mt="md">
          <Text>{trip.country}</Text>
          <DatePickerInput
            type="default"
            label="Start Date"
            placeholder="Pick Start Date"
            value={trip.startDate}
            // onChange={setValue}
          />
          <DatePickerInput
            type="default"
            label="End Date"
            placeholder="Pick End Date"
            value={trip.endDate}
            // onChange={setValue}
          />
        </Stack>
      </Box>
      <Box px="2em" py="1rem">
        <Title order={5}>Destinations</Title>
        <Stack>
          <Accordion variant="standard">
            {trip.destinations.map((dest) => (
              <Accordion.Item value={dest.name} key={dest.id}>
                <Accordion.Control
                  style={{ borderRadius: '10px' }}
                  bg={dest.color as DefaultMantineColor}
                  c="white"
                  mt="xs"
                >
                  {dest.name}
                </Accordion.Control>
                <Accordion.Panel>
                  {dest.activities.map((activity) => (
                    <Flex gap="sm" key={activity.id}>
                      <Card p={1}>{activity.title}</Card>
                    </Flex>
                  ))}
                </Accordion.Panel>
              </Accordion.Item>
              // <Card key={dest.name} p="xs" bg={dest.color!} c="white">

              // </Card>
            ))}
          </Accordion>
        </Stack>

        {/* <h2>All Events ({eventStore.events.length})</h2>
        <ul>{eventStore.events.map(renderSidebarEvent)}</ul> */}
      </Box>
    </Box>
  );
};
