import clsx from 'clsx';

interface HorizontalLineProps {
  text?: string;
  className?: string;
  pulse?: boolean;
}

export const HorizontalLine: React.FC<HorizontalLineProps> = ({
  text,
  className,
  pulse = false,
}) => {
  return (
    <div className={clsx('relative flex items-center', className)}>
      <div
        className={clsx(
          'flex-grow border-t opacity-50',
          pulse ? 'animate-colorPulse' : 'border-gray-300'
        )}
      />
      {text && (
        <span className={clsx('mx-4 bg-white px-4 text-gray-500 text-lg')}>
          {text}
        </span>
      )}
      <div
        className={clsx(
          'flex-grow border-t opacity-50',
          pulse ? 'animate-colorPulse' : 'border-gray-300'
        )}
      />
    </div>
  );
};
