'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Activity, Meal } from '@prisma/client';
import axios from 'axios';
import { Box, Stack, Text, Title } from '@mantine/core';
import { DestinationWithDetails } from '@/app/types/DestinationWithDetails';
import EventCard from './EventCard';

interface Props {
  destination: DestinationWithDetails;
}

const EventList = ({ destination }: Props) => {
  const [activities, setActivities] = useState<Activity[]>();
  const [meals, setMeals] = useState<Meal[]>();

  useEffect(() => {
    setActivities(Array.from(destination.activities));
    setMeals(Array.from(destination.meals));
  }, [destination]);

  const handleOnActivityDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedList = Array.from(activities!);
    const [movedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, movedItem);

    updatedList.forEach(async (activity, index) => {
      updatedList[index].rank = index + 1;
      await axios.patch(`/api/activity/${activity.id}`, { ...activity, rank: index + 1 });
    });

    setActivities(updatedList);
  };

  const handleOnMealDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedList = Array.from(meals!);
    const [movedItem] = updatedList.splice(result.source.index, 1);
    updatedList.splice(result.destination.index, 0, movedItem);

    updatedList.forEach(async (meal, index) => {
      updatedList[index].rank = index + 1;
      await axios.patch(`/api/meal/${meal.id}`, { ...meal, rank: index + 1 });
    });

    setMeals(updatedList);
  };

  return (
    <Stack gap="xs" mt="sm">
      <Box>
        <Title order={5}>Activities</Title>

        {!activities && <Text>No Activities Planed Yet</Text>}
        {activities && (
          <DragDropContext onDragEnd={handleOnActivityDragEnd}>
            <Droppable droppableId="activities">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  h={(activities.length * 32).toString() + 'px'}
                >
                  {activities
                    .sort((a, b) => (a.rank > b.rank ? 1 : -1))
                    .map((activity, index) => (
                      <Draggable
                        key={`activity-${activity.id}`}
                        draggableId={activity.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <EventCard event={activity} type="activity" />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Box>
      <Box>
        <Title order={5}>Food</Title>
        <DragDropContext onDragEnd={handleOnMealDragEnd}>
          <Droppable droppableId="meals">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {destination.meals
                  .sort((a, b) => (a.rank > b.rank ? 1 : -1))
                  .map((meal, index) => (
                    <Draggable
                      key={`meal-${meal.id}`}
                      draggableId={meal.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <EventCard event={meal} type="meal" />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
      <Box>
        <Title order={5}>Lodging</Title>
        <DragDropContext onDragEnd={handleOnMealDragEnd}>
          <Droppable droppableId="lodging">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {destination.lodgings
                  .sort((a, b) => (a.rank > b.rank ? 1 : -1))
                  .map((lodging, index) => (
                    <Draggable
                      key={`lodge-${lodging.id}`}
                      draggableId={lodging.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <EventCard event={lodging} type="lodging" />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Stack>
  );
};

export default EventList;
