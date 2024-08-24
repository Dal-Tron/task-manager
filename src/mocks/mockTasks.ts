class MockTask {
  id: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  updated_at: string;
  completion: number;
  tags: number[];

  constructor(
    id: number,
    title: string,
    description: string,
    start_date: string,
    due_date: string,
    updated_at: string,
    completion: number,
    tags: number[]
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.start_date = start_date;
    this.due_date = due_date;
    this.updated_at = updated_at;
    this.completion = completion;
    this.tags = tags;
  }
}

export const mockTasks = [
  new MockTask(
    1,
    'Review the project report',
    'Go through the project report and make final edits before submission.',
    '2024-08-22T00:00:00Z',
    '2024-08-25T00:00:00Z',
    '2024-08-21T18:30:00Z',
    80,
    [1, 2]
  ),
  new MockTask(
    2,
    'Plan team meeting',
    'Prepare the agenda and send out invites for the team meeting next week.',
    '2024-08-21T00:00:00Z',
    '2024-08-23T00:00:00Z',
    '2024-08-20T17:30:00Z',
    50,
    [2, 3]
  ),
  new MockTask(
    3,
    'Update project timeline',
    'Review the project timeline and update the tasks based on the current progress.',
    '2024-08-20T00:00:00Z',
    '2024-08-22T00:00:00Z',
    '2024-08-19T15:45:00Z',
    100,
    [1, 4]
  ),
  new MockTask(
    4,
    'Draft budget proposal',
    'Prepare a budget proposal for the upcoming quarter based on projected expenses.',
    '2024-08-19T00:00:00Z',
    '2024-08-21T00:00:00Z',
    '2024-08-18T14:00:00Z',
    30,
    [4, 5]
  ),
  new MockTask(
    5,
    'Research market trends',
    'Analyze current market trends to identify new opportunities for growth.',
    '2024-08-18T00:00:00Z',
    '2024-08-20T00:00:00Z',
    '2024-08-17T12:15:00Z',
    70,
    [3, 5]
  ),
  new MockTask(
    6,
    'Design new marketing strategy',
    'Develop a comprehensive marketing strategy to increase brand awareness.',
    '2024-08-17T00:00:00Z',
    '2024-08-19T00:00:00Z',
    '2024-08-16T10:45:00Z',
    40,
    [6]
  ),
  new MockTask(
    7,
    'Conduct team performance reviews',
    'Hold individual meetings with team members to discuss performance and set goals.',
    '2024-08-16T00:00:00Z',
    '2024-08-18T00:00:00Z',
    '2024-08-15T09:30:00Z',
    90,
    [2, 6]
  ),
  new MockTask(
    8,
    'Organize client feedback session',
    'Gather feedback from clients to improve service offerings and customer satisfaction.',
    '2024-08-15T00:00:00Z',
    '2024-08-17T00:00:00Z',
    '2024-08-14T08:00:00Z',
    20,
    [7]
  ),
  new MockTask(
    9,
    'Develop new product prototype',
    'Create an initial prototype of the new product for testing and feedback.',
    '2024-08-14T00:00:00Z',
    '2024-08-16T00:00:00Z',
    '2024-08-13T07:00:00Z',
    60,
    [3, 7]
  ),
  new MockTask(
    10,
    'Prepare quarterly financial report',
    'Compile and review financial data to prepare the quarterly financial report.',
    '2024-08-13T00:00:00Z',
    '2024-08-15T00:00:00Z',
    '2024-08-12T06:30:00Z',
    100,
    [5]
  ),
];
