import { Destination } from '@prisma/client';

// services/destinationService.ts
export async function addDestination(destination: Partial<Destination>) {
  try {
    const response = await fetch(`/api/destination`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(destination),
    });

    if (!response.ok) {
      throw new Error('Failed to add destination');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding destination:', error);
    throw error;
  }
}

export async function removeDestination(destinationId: number) {
  try {
    const response = await fetch(`/api/destination/${destinationId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to remove destination');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing destination:', error);
    throw error;
  }
}

export async function updateDestination(destinationId: number, updatedData: Partial<Destination>) {
  try {
    const response = await fetch(`/api/destination/${destinationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error('Failed to update destination');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating destination:', error);
    throw error;
  }
}
