'use client';

import { useEffect, useState } from 'react';
import {
  DateInput,
  DateSelectArg,
  EventChangeArg,
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Activity, ActivityType, Destination, Lodging, Meal } from '@prisma/client';
import axios from 'axios';
import { Box, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ActivityDetails from '@/app/components/Activity/ActivityDetails';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';
import { EventTypes } from './sidebar/EventCard';
import { Sidebar } from './sidebar/SideBar';
import classes from './Calendar.module.css';

export type EventWithData = EventInput & {
  data: { activity?: Activity; destination?: Destination; meal?: Meal; lodging?: Lodging };
  type: EventTypes;
};

interface Props {
  trip: TripWithDestinations;
}

const eventColors = {
  [ActivityType.TRAVEL]: 'var(--mantine-color-blue-dianne-7)',
  [ActivityType.ACTIVITY]: 'var(--mantine-color-blue-dianne-7)',
  [ActivityType.HISTORICAL]: 'var(--mantine-color-blue-dianne-7)',
  [ActivityType.TOUR]: 'var(--mantine-color-blue-dianne-7)',
};

export const Calendar = ({ trip }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [events, setEvents] = useState<EventWithData[]>();

  useEffect(() => {
    const destEvents: EventWithData[] = trip.destinations.map((destination) => {
      return {
        id: 'dest' + destination.id.toString(),
        title: destination.name,
        start: destination.startDate as DateInput,
        end: destination.endDate as DateInput,
        backgroundColor: destination.color!,
        allDay: true,
        data: { destination },
        type: 'destination',
      };
    });

    trip.destinations.forEach((dest) => {
      dest.activities.forEach((activity) => {
        if (activity.onCalendar) {
          destEvents.push({
            id: 'activity' + activity.id.toString(),
            title: activity.title,
            start: activity.start as DateInput,
            end: activity.end as DateInput,
            backgroundColor: '#669bbc',
            // textColor: 'var(--mantine-color-slate-earth-7)',
            // borderColor: 'var(--mantine-color-gray-5)',
            allDay: false,
            data: { activity },
            type: 'activity',
          });
        }
      });

      dest.meals.forEach((meal) => {
        if (meal.onCalendar) {
          destEvents.push({
            id: 'meal' + meal.id.toString(),
            title: meal.title,
            start: meal.start as DateInput,
            end: meal.end as DateInput,
            backgroundColor: 'var(--mantine-color-slate-earth-1)',
            textColor: 'var(--mantine-color-slate-earth-7)',
            borderColor: 'var(--mantine-color-gray-5)',
            allDay: false,
            data: { meal },
            type: 'meal',
          });
        }
      });

      dest.lodgings.forEach((lodging) => {
        if (lodging.onCalendar) {
          destEvents.push({
            id: 'lodge' + lodging.id.toString(),
            title: lodging.name,
            start: lodging.start as DateInput,
            end: lodging.end as DateInput,
            backgroundColor: 'var(--mantine-color-gray-1)',
            textColor: 'var(--mantine-color-gray-7)',
            borderColor: 'var(--mantine-color-gray-5)',
            allDay: true,
            data: { lodging },
            type: 'lodging',
          });
        }
      });
    });

    setEvents(destEvents);
  }, [trip]);

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events?.find((e) => e.id === clickInfo.event.id);

    if (event?.data?.activity) {
      setSelectedActivity(event?.data?.activity);
    }
    open();
  };

  function handleDateSelect(selectInfo: DateSelectArg) {
    let title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    // eventStore.addEvent(selectInfo, title);
  }

  function handleEventChange(changeInfo: EventChangeArg) {
    const eventDetails = changeInfo.event._def.extendedProps;
    const type = eventDetails.type;
    const id = eventDetails.data[type].id;

    axios.patch(`/api/${type}/${id}`, changeInfo.event);
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title={selectedActivity?.title} size={'lg'}>
        <ActivityDetails />
      </Modal>
      <Flex h="100%" fz="14px">
        <Sidebar trip={trip} />
        <Box className={classes.calendarMain}>
          <FullCalendar
            initialDate={new Date(trip.startDate!)}
            timeZone="Europe/France"
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
            events={events}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventChange={handleEventChange}
          />
        </Box>
      </Flex>
    </>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  if (eventContent.timeText)
    return (
      <>
        <b>{eventContent.timeText}</b> <i>{eventContent.event.title}</i>
      </>
    );
  else return <b>{eventContent.event.title}</b>;
}

export default Calendar;
