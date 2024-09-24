'use client';

import React, { useEffect, useState } from 'react';
import { DateSelectArg, EventChangeArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Activity, ActivityType } from '@prisma/client';
import axios from 'axios';
import { Box, Flex } from '@mantine/core';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';
// import { observer } from 'mobx-react-lite';
// import { eventStoreContext } from './event-store';
import { Sidebar } from './SideBar';
import classes from './Calendar.module.css';

interface Props {
  trip: TripWithDestinations;
}

const eventColors = {
  [ActivityType.TRAVEL]: 'var(--mantine-color-orange-7)',
  [ActivityType.ACTIVITY]: 'var(--mantine-color-blue-7)',
  [ActivityType.FOOD]: 'var(--mantine-color-orange-7)',
  [ActivityType.HISTORICAL]: 'var(--mantine-color-blue-7)',
  [ActivityType.TOUR]: 'var(--mantine-color-red-7)',
};

export const Calendar = ({ trip }: Props) => {
  // const eventStore = useContext(eventStoreContext);
  const [events, setEvents] = useState<object[]>();

  useEffect(() => {
    const destEvents = trip.destinations.map((dest) => {
      return {
        id: dest.id,
        title: dest.name,
        start: dest.startDate,
        end: dest.endDate,
        backgroundColor: dest.color,
        allDay: true,
      };
    });

    trip.destinations.forEach((dest) =>
      dest.activities.forEach((activity) =>
        destEvents.push({
          id: activity.id,
          title: activity.title,
          start: activity.start,
          end: activity.end,
          backgroundColor: eventColors[activity.type],
          allDay: false,
        })
      )
    );

    setEvents(destEvents);
  }, [trip]);

  function handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      // eventStore.deleteEvent(clickInfo.event.id);
    }
  }

  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    // eventStore.addEvent(selectInfo, title);
  }

  function handleEventChange(changeInfo: EventChangeArg) {
    axios.patch(`/api/activity/${changeInfo.event.id}`, changeInfo.event);
    // eventStore.changeEvent(changeInfo);
  }

  return (
    <Flex h="100%" fz="14px">
      <Sidebar trip={trip} />
      <Box className={classes.calendarMain}>
        <FullCalendar
          height="100%"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          /**
           * slice() is used to achieve MobX observability on eventStore.events
           * https://mobx.js.org/best/react.html#incorrect-use-an-observable-but-without-accessing-any-of-its-properties
           */
          events={events} //
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventChange={handleEventChange}
        />
      </Box>
    </Flex>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

export default Calendar;
