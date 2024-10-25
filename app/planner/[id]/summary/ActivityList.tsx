import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { MdClose } from 'react-icons/md';
import { Box, Button, Group, Input, Text } from '@mantine/core';
import useActivityManager from '@/app/hooks/useActivityManager';

interface Props {
  destinationId: number;
}

const ActivityList = ({ destinationId }: Props) => {
  const { activities, handleAddActivity, handleRemoveActivity } = useActivityManager(destinationId);
  const [newActivity, setNewActivity] = useState<string | null>(null);

  return (
    <Box>
      {activities.map((activity, index) => (
        <Group key={index}>
          <Text>{activity.title}</Text>
          <Button
            variant="light"
            radius="md"
            fz="xl"
            p="sm"
            color="red"
            onClick={() => handleRemoveActivity(activity.id)}
          >
            <MdClose />
          </Button>
        </Group>
      ))}
      <Group>
        <Input
          placeholder="Activity Title"
          onChange={(event) => setNewActivity(event.target.value)}
        />
        <Button
          variant="light"
          onClick={() => handleAddActivity({ title: newActivity!, destinationId })}
        >
          Add Event <IconPlus size="1rem" />
        </Button>
      </Group>
    </Box>
  );
};

export default ActivityList;
