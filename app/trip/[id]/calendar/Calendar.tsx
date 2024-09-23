'use client';

import React from 'react';
import { DateSelectArg, EventChangeArg, EventClickArg, EventContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Flex } from '@mantine/core';
// import { observer } from 'mobx-react-lite';
// import { eventStoreContext } from './event-store';
import { Sidebar } from './SideBar';
import classes from './Calendar.module.css';

export const Calendar = () => {
  // const eventStore = useContext(eventStoreContext);

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
    // eventStore.changeEvent(changeInfo);
  }

  return (
    <Flex mih="100%" fz="14px">
      <Sidebar />
      <Box className={classes.calendarMain}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          /**
           * slice() is used to achieve MobX observability on eventStore.events
           * https://mobx.js.org/best/react.html#incorrect-use-an-observable-but-without-accessing-any-of-its-properties
           */
          // events={eventStore.events.slice()} //
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
