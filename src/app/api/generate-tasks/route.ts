// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';

import { mockTasks } from '@/mocks';

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();

    // Attempt to generate tasks from the AI API
    let tasks = [];
    try {
      tasks = await generateTasksFromAI(title, description);
    } catch (error) {
      console.error('Error calling AI API:', error);
    }

    // If no tasks were returned by the AI API, use mock tasks
    if (tasks.length === 0) {
      tasks = mockTasks.slice(0, 6); // Limit to 6 mock tasks
    }

    // Return the tasks in the response
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error('Error generating tasks:', error);
    return NextResponse.json(
      { message: 'An error occurred while generating tasks.' },
      { status: 500 }
    );
  }
}

async function generateTasksFromAI(title: string, description: string) {
  const apiKey = process.env.AI_API_KEY!;
  const apiUrl = process.env.AI_API_URL!;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content:
              'You are an AI that helps generate detailed tasks for project management.',
          },
          {
            role: 'user',
            content: `Generate tasks for a project titled "${title}" with the following description: "${description}".`,
          },
        ],
        max_tokens: 512,
        stream: false,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0].message) {
      throw new Error('Unexpected API response format');
    }

    const tasks = data.choices[0].message.content
      .split('\n')
      .filter((line) => line.trim())
      .map((line, index) => {
        const trimmedLine = line.trim();

        if (
          trimmedLine.startsWith('###') ||
          trimmedLine.startsWith('**') ||
          trimmedLine.startsWith('-') ||
          trimmedLine.includes('Project:')
        ) {
          return null;
        }

        return {
          id: index + 1,
          title: trimmedLine,
          description: `This task is related to: ${title}`,
          start_date: new Date().toISOString(),
          due_date: new Date(new Date().getTime() + 86400000).toISOString(),
          updated_at: new Date().toISOString(),
          completion: 0,
          parent_task_ids: [],
        };
      })
      .filter((task) => task !== null);

    return tasks;
  } catch (error) {
    console.error('Error calling AI API:', error);
    throw new Error('Failed to generate tasks.');
  }
}
