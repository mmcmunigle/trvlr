import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Group, Select, Textarea, TextInput } from '@mantine/core';
import { DateTimePicker, DateValue } from '@mantine/dates';
import { EventObject, EventTypes } from './sidebar/EventCard';

const eventTypes = [
  { value: 'activity', label: 'Activity' },
  { value: 'meal', label: 'Meal' },
  { value: 'lodging', label: 'Lodging' },
  { value: 'transportation', label: 'Transportation' },
];

interface Props {
  destinations: { name: string; id: number }[];
  start: Date;
  end: Date;
  onSubmit: (savedEvent: EventObject, type: EventTypes) => void;
}

const NewEventForm = ({ destinations, start, end, onSubmit }: Props) => {
  const [formValues, setFormValues] = useState({
    city: '',
    eventType: '',
    title: '',
    description: '',
    address: '',
    notes: '',
  });

  const handleChange = (field: string, value: string | DateValue) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const resp = await axios.post(`/api/${formValues.eventType}`, {
      title: formValues.title,
      destinationId: destinations.find((d) => d.name === formValues.city)?.id,
      start: start,
      end: end,
      rank: 1,
      onCalendar: true,
    });

    onSubmit(resp.data, formValues.eventType as EventTypes);
    console.log(resp);
  };

  return (
    <Box maw={400} mx="auto">
      <Select
        label="City"
        placeholder="Select a city"
        data={destinations.map((d) => d.name)}
        value={formValues.city}
        onChange={(value) => handleChange('city', value!)}
        required
      />

      <Select
        label="Event Type"
        placeholder="Select an event type"
        data={eventTypes}
        value={formValues.eventType}
        onChange={(value) => handleChange('eventType', value!)}
        required
        mt="md"
      />

      <TextInput
        label="Title"
        placeholder="Event title"
        value={formValues.title}
        onChange={(e) => handleChange('title', e.target.value)}
        required
        mt="md"
      />

      <TextInput
        label="Address"
        placeholder="Event address"
        value={formValues.address}
        onChange={(e) => handleChange('address', e.target.value)}
        mt="md"
      />

      <Textarea
        label="Notes"
        placeholder="Additional notes"
        value={formValues.notes}
        onChange={(e) => handleChange('notes', e.target.value)}
        mt="md"
      />

      <Group align="right" mt="md">
        <Button onClick={handleSubmit}>Submit</Button>
      </Group>
    </Box>
  );
};

export default NewEventForm;
