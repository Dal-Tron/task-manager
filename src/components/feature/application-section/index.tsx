'use client';

import { useEffect, useState } from 'react';

import { HorizontalLine } from '@/components/base/horizontal-line';
import { SkeletonTaskCard } from '@/components/base/skeleton/SkeletonTaskCard';
import { CreateSubtaskCard } from '@/components/feature/create-subtask';
import { TaskCard } from '@/components/feature/task-card';
import { TaskInput } from '@/components/feature/task-input';

import { mockTasks } from './constants/mockTasks';

export const ApplicationSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [showRealTasks, setShowRealTasks] = useState(false);
  const [triggerTyping, setTriggerTyping] = useState(false);

  const resetTyping = () => {
    setInputValue('');
    setDescriptionValue('');
    setTriggerTyping(true);
  };

  useEffect(() => {
    if (triggerTyping || !showRealTasks) {
      const typeText = (
        text: string,
        setValue: (val: string) => void,
        callback?: () => void
      ) => {
        let typingIndex = 0;
        const typingSpeed = 100;

        const type = () => {
          if (typingIndex < text.length) {
            setValue(text.slice(0, typingIndex + 1));
            typingIndex++;
            setTimeout(type, typingSpeed);
          } else if (callback) {
            callback();
          }
        };
        type();
      };

      const startTyping = () => {
        typeText('Finish the project report', setInputValue, () => {
          typeText(
            'Complete the final draft of the intro report and submit it.',
            setDescriptionValue,
            () => {
              setShowRealTasks(true);
            }
          );
        });
      };

      startTyping();
      setTriggerTyping(false);
    }
  }, [triggerTyping, showRealTasks]);

  useEffect(() => {
    if (showRealTasks) {
      setTimeout(() => {
        setShowRealTasks(false);
        resetTyping();
      }, 5000);
    }
  }, [showRealTasks]);

  return (
    <div className="py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center w-full mb-8">
          <TaskInput
            inputValue={inputValue}
            descriptionValue={descriptionValue}
            onInputChange={setInputValue}
            onDescriptionChange={setDescriptionValue}
            onSaveTask={() => {}}
          />
        </div>

        <HorizontalLine text="Unlock AI-Powered Tasks" pulse={true} />

        <div className="mx-auto mt-8 grid w-full max-w-full grid-cols-1 gap-x-4 gap-y-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-0">
          <CreateSubtaskCard />
          {!showRealTasks ? (
            <>
              <SkeletonTaskCard />
              <SkeletonTaskCard />
              <SkeletonTaskCard />
              <SkeletonTaskCard />
              <SkeletonTaskCard />
            </>
          ) : (
            mockTasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                datetime={task.datetime}
                category={task.category}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
