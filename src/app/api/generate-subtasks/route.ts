import { NextRequest, NextResponse } from 'next/server';

import { MockTask } from '@/mocks';

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    // Log the received title and description to the server console
    console.log('Received title:', title);
    console.log('Received description:', description);

    // Mock a delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Call to the ChatGPT API (you need to implement the API call logic)
    const subtasks = await generateSubtasksFromChatGPT(title, description);

    return NextResponse.json({ subtasks });
  } catch (error) {
    console.error('Error generating subtasks:', error);
    return NextResponse.json(
      { message: 'An error occurred while generating subtasks.' },
      { status: 500 }
    );
  }
}

async function generateSubtasksFromChatGPT(title: string, description: string) {
  // Generate 5 subtasks with mock data using the MockTask class
  const subtasks = [
    new MockTask(
      1,
      'Subtask 1',
      `Subtask related to: ${title}`,
      '2024-08-22T00:00:00Z',
      '2024-08-23T00:00:00Z',
      '2024-08-21T18:30:00Z',
      0,
      [1, 2]
    ),
    new MockTask(
      2,
      'Subtask 2',
      `Subtask related to: ${description}`,
      '2024-08-22T00:00:00Z',
      '2024-08-24T00:00:00Z',
      '2024-08-22T10:30:00Z',
      0,
      [3]
    ),
    new MockTask(
      3,
      'Subtask 3',
      `Further work on: ${title}`,
      '2024-08-23T00:00:00Z',
      '2024-08-25T00:00:00Z',
      '2024-08-22T12:00:00Z',
      0,
      [4, 5]
    ),
    new MockTask(
      4,
      'Subtask 4',
      `Review: ${description}`,
      '2024-08-23T00:00:00Z',
      '2024-08-26T00:00:00Z',
      '2024-08-23T08:00:00Z',
      0,
      [1]
    ),
    new MockTask(
      5,
      'Subtask 5',
      `Finalize ${title}`,
      '2024-08-24T00:00:00Z',
      '2024-08-27T00:00:00Z',
      '2024-08-24T15:00:00Z',
      0,
      [2, 6]
    ),
  ];

  return subtasks;
}
