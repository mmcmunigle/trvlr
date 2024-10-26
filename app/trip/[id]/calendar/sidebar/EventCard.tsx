import { useRouter } from 'next/navigation';
import { Activity, Lodging, Meal } from '@prisma/client';
import axios from 'axios';
import { BsThreeDots } from 'react-icons/bs';
import { MdDeleteForever } from 'react-icons/md';
import { ActionIcon, Card, Checkbox, Flex, Group, Menu, Text, Tooltip } from '@mantine/core';

export type EventTypes = 'destination' | 'activity' | 'meal' | 'lodging';
export type EventObject = Activity | Meal | Lodging;

interface Props {
  event: EventObject;
  type: EventTypes;
}

const EventCard = ({ event, type }: Props) => {
  const router = useRouter();

  const onToggle = async (checked: boolean, id: number, type: EventTypes) => {
    console.log(`/api/${type}/${id}`, checked);

    await axios.patch(`/api/${type}/${id}`, {
      onCalendar: checked,
      start: event.start || new Date(),
      end: event.end || new Date(),
    });

    // Probably a better way to handle this?
    router.refresh();
  };
  return (
    <Card px={4} py={0} my={2} h="2rem" bg="rgba(215, 215, 215,  0.1)">
      <Flex justify="space-between" align="center">
        <Group gap="xs">
          <Tooltip label={event.onCalendar ? 'Remove from Calendar' : 'Add to Calendar'}>
            <Checkbox
              size="xs"
              checked={event.onCalendar}
              onChange={(change) => onToggle(change.target.checked, event.id, type)}
            />
          </Tooltip>
          <Text fw={500} size="sm">
            {event.title}
          </Text>
        </Group>
        <Menu>
          <Menu.Target>
            {/* <Tooltip label="Options"> */}
            <ActionIcon variant="transparent">
              <BsThreeDots size="16px" />
            </ActionIcon>
            {/* </Tooltip> */}
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item
              onClick={() => console.log('DELETE')}
              leftSection={<MdDeleteForever style={{ width: 'rem(14)', height: 'rem(14)' }} />}
            >
              Remove From Trip
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Card>
  );
};

export default EventCard;
