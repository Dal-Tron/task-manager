import clsx from 'clsx';

interface SkeletonTaskCardProps {
  className?: string;
  variant?: 'skeleton' | 'ghost';
}

export const SkeletonTaskCard: React.FC<SkeletonTaskCardProps> = ({
  className,
  variant = 'skeleton',
}) => (
  <div
    className={clsx(
      'relative h-48 rounded-lg flex items-center justify-center',
      variant === 'skeleton' && 'animate-pulseWiggle bg-gray-300',
      variant === 'ghost' &&
        'border-2 border-dotted border-gray-500 bg-transparent',
      className
    )}
  >
    {variant === 'skeleton' && (
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500" />
    )}
  </div>
);
