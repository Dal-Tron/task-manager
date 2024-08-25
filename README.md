# Project Documentation

## Overview

This project is a task management application built with Next.js, TypeScript, and Tailwind CSS. The application allows users to create, view, and manage tasks and subtasks. The structure leverages Next.js's App Router for dynamic routing and features reusable components to keep the codebase maintainable.

## Key Features

- **Task Management**: Create, view, update, and delete tasks and subtasks.
- **Dynamic Routing**: Uses Next.js's App Router to dynamically load task details based on the URL.
- **Responsive Design**: Built with Tailwind CSS, ensuring a mobile-first, responsive design.
- **Skeleton Loaders**: Skeleton screens are used to enhance the user experience during data loading.

## Project Structure

```
/app
  /dashboard
    /[task_id]
      page.tsx
    layout.tsx
    page.tsx
/components
  /base
    HorizontalLine.tsx
    SkeletonTaskCard.tsx
  /feature
    /task-card
      TaskCard.tsx
    /task-input
      TaskInput.tsx
    /dashboard-content
      ConsolidatedComponent.tsx
      CreateTaskCard.tsx
      SubtaskSection.tsx
      TaskList.tsx
/hooks
  useTaskManager.ts
/services
  TaskService.ts
/types
  task.ts
```

### Components

1. **ConsolidatedComponent.tsx**

   - Combines the logic of both the dashboard and task details pages.
   - If a `task_id` is provided, it auto-populates the form fields; otherwise, it displays a task creation interface.

2. **CreateTaskCard.tsx**

   - A card component that navigates the user to the `/dashboard` page when clicked, using Next.js's `useRouter` hook.
   - Displays a plus icon and a prompt to create a new task.

3. **TaskList.tsx**

   - A reusable component that displays a list of tasks.
   - Includes a `CreateTaskCard` and handles loading states with skeleton loaders.
   - Accepts `tasks`, `loadingTasks`, and `onDelete` as props.

4. **TaskInput.tsx**

   - A form component for creating or editing tasks.
   - Handles input and description changes, task saving, and subtask addition.

5. **SubtaskSection.tsx**

   - Manages and displays subtasks for a given task.
   - Handles loading states and displays skeleton loaders during data fetching.

6. **SkeletonTaskCard.tsx**
   - A skeleton loader component that mimics the layout of a task card to maintain UI consistency during data loading.

### Hooks

1. **useTaskManager.ts**
   - Custom hook that manages the state and logic for task and subtask operations.
   - Accepts an optional initial task for auto-populating form fields.
   - Handles task creation, deletion, subtask fetching, and input management.

### Services

1. **TaskService.ts**
   - Service layer for interacting with the task data stored in the database.
   - Provides methods like `createTask`, `getTasks`, `getTaskById`, `updateTask`, and `deleteTask`.

### Types

1. **task.ts**
   - Defines the `ITask` interface, representing the structure of a task object.
   - Ensures type safety throughout the application.

## Navigation and Dynamic Routing

- **Dashboard Page (`/dashboard`)**:

  - Displays all tasks and allows users to create new tasks or navigate to existing ones.
  - The `TaskList` component is used to display tasks, with a `CreateTaskCard` at the top.

- **Task Details Page (`/dashboard/[task_id]`)**:
  - Displays the details of a specific task and auto-populates the form fields for editing.
  - Uses the `useTaskManager` hook to manage the task's data and state.
  - Implements a skeleton loader to prevent layout shifts during data fetching.

## Handling Layout Shifts

- **Skeleton Loaders**:
  - Used in both task lists and task details to ensure that the UI remains consistent during data loading.
  - Prevents the page from collapsing and expanding while data is being fetched.

## Reusable Components and DRY Principles

- **TaskList Component**:

  - Abstracts the logic for displaying tasks and handles both loading and deletion operations.
  - Ensures consistency across different parts of the application that display lists of tasks.

- **ConsolidatedComponent**:
  - Centralizes the logic for task input and details into a single component, making it easy to manage and maintain.
  - Reduces code duplication by handling both the creation of new tasks and the editing of existing ones within the same component.

## Development Notes

- Ensure that all components follow the same styling guidelines to maintain UI consistency.
- The `useTaskManager` hook is the primary state manager for tasks and subtasks; any new task-related features should integrate with this hook.
- When adding new pages or components, consider how they can be abstracted to be reusable and consistent with existing components.
