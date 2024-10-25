// services/activityService.ts
import { Activity } from '@prisma/client';

export async function addActivity(activity: Partial<Activity>) {
  try {
    const response = await fetch('/api/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error('Failed to add activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding activity:', error);
    throw error;
  }
}

export async function removeActivity(activityId: number) {
  try {
    const response = await fetch(`/api/activity/${activityId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing activity:', error);
    throw error;
  }
}

export async function updateActivity(activityId: number, updatedData: Partial<Activity>) {
  try {
    const response = await fetch(`/api/activity/${activityId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update activity');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating activity:', error);
    throw error;
  }
}
