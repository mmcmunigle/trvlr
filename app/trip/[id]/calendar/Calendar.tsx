'use client';

import React, { useEffect, useState } from 'react';
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
import { Activity, Destination, Lodging, Meal, PlaceType } from '@prisma/client';
import axios from 'axios';
import { Box, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import ActivityDetails from '@/app/components/Activity/ActivityDetails';
import ModalWrapper from '@/app/components/ModalWrapper';
import { TripWithDestinations } from '@/app/types/TripWithDestinations';
import NewEventForm from './NewEventForm';
import { EventObject, EventTypes } from './sidebar/EventCard';
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
  [PlaceType.TRAVEL]: 'var(--mantine-color-blue-dianne-7)',
  [PlaceType.ACTIVITY]: 'var(--mantine-color-blue-dianne-7)',
  [PlaceType.FOOD]: 'var(--mantine-color-blue-dianne-7)',
  [PlaceType.LODGING]: 'var(--mantine-color-blue-dianne-7)',
};

export const Calendar = ({ trip }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [events, setEvents] = useState<EventWithData[]>();
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [selectedStart, setSelectedStart] = useState<Date>();
  const [selectedEnd, setSelectedEnd] = useState<Date>();

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
            data: { activity: activity },
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
            title: lodging.title,
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

  const findDestinationInTime = (date: Date) => {
    const index = trip.destinations.findIndex(
      (dest) => dest.startDate! <= date && dest.endDate! >= date
    );
    return trip.destinations[index].id;
  };

  const dateWithoutTimezone = (date: Date) => {
    const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const withoutTimezone = new Date(date.valueOf() - tzoffset).toISOString().slice(0, -1);
    return withoutTimezone;
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    setSelectedStart(selectInfo.start);
    setSelectedEnd(selectInfo.end);
    setOpenAddModal(true);

    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
  };

  const handleEventAdded = (savedEvent: EventObject, type: EventTypes) => {
    const event: EventWithData = {
      id: 'activity' + savedEvent.id.toString(),
      title: savedEvent.title,
      start: savedEvent.start as DateInput,
      end: savedEvent.end as DateInput,
      backgroundColor: '#669bbc',
      // textColor: 'var(--mantine-color-slate-earth-7)',
      // borderColor: 'var(--mantine-color-gray-5)',
      allDay: type === 'lodging' ? true : false,
      type: type,
      data: { activity: savedEvent as Activity },
    };

    switch (type) {
      case 'activity':
        event.data = { activity: savedEvent as Activity };
      case 'meal':
        event.data = { meal: savedEvent as Meal };
      case 'lodging':
        event.data = { lodging: savedEvent as Lodging };
    }

    setEvents([...events!, event]);
    setOpenAddModal(false);
  };

  function handleEventChange(changeInfo: EventChangeArg) {
    const eventDetails = changeInfo.event._def.extendedProps;
    const type = eventDetails.type;
    const id = eventDetails.data[type].id;

    axios.patch(`/api/${type}/${id}`, {
      start: dateWithoutTimezone(changeInfo.event.start!),
      end: dateWithoutTimezone(changeInfo.event.end!),
      title: changeInfo.event.title,
    });
  }

  return (
    <>
      <ModalWrapper
        title="New Event"
        size="md"
        openModal={openAddModal}
        onClose={() => setOpenAddModal(false)}
      >
        <NewEventForm
          start={selectedStart!}
          end={selectedEnd!}
          destinations={trip.destinations.map((d) => ({ name: d.name, id: d.id }))}
          onSubmit={handleEventAdded}
        />
      </ModalWrapper>

      <Modal opened={opened} onClose={close} title={selectedActivity?.title} size={'lg'}>
        <ActivityDetails />
      </Modal>
      <Flex h="100%" fz="14px">
        <Sidebar trip={trip} />
        <Box className={classes.calendarMain}>
          <FullCalendar
            initialDate={new Date(trip.startDate!)}
            timeZone="UTC"
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
