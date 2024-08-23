import React from 'react';

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  datetime: string;
  category: {
    title: string;
    href: string;
  };
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  date,
  datetime,
  category,
}) => {
  return (
    <div
      key={id}
      className="bg-white p-6 rounded-md shadow-md max-w-xl w-full flex flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={datetime} className="text-gray-500">
          {date}
        </time>
        <a
          href={category.href}
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {category.title}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="#">
            <span className="absolute inset-0" />
            {title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
};
