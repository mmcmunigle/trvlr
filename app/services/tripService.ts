import { Trip } from '@prisma/client';

// services/tripService.ts
export async function createTrip(tripData: Partial<Trip>) {
  try {
    const response = await fetch('/api/trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
    });

    if (!response.ok) {
      throw new Error('Failed to create trip');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating trip:', error);
    throw error;
  }
}

export async function updateTrip(tripId: number, updatedData: Partial<Trip>) {
  try {
    const response = await fetch(`/api/trip/${tripId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update trip');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating trip:', error);
    throw error;
  }
}
