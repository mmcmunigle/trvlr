import React from 'react';
import { EventInput, formatDate } from '@fullcalendar/core';
import { Box, Text, Title } from '@mantine/core';

// import { observer } from 'mobx-react-lite';
// import { eventStoreContext } from './event-store';

export const Sidebar = function Sidebar() {
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
    <Box w="300px" bg="#eaf9ff" bd="1px solid #d3e2e8">
      <Box p="2em">
        <Title order={5}>Instructions</Title>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </Box>
      <Box p="2em">
        <Title order={5}>All Events</Title>
        {/* <h2>All Events ({eventStore.events.length})</h2>
        <ul>{eventStore.events.map(renderSidebarEvent)}</ul> */}
      </Box>
    </Box>
  );
};
