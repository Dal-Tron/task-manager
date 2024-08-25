import clsx from 'clsx';
import { FaSpinner } from 'react-icons/fa';

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
      <FaSpinner className="animate-spin h-10 w-10 text-gray-500" />
    )}
  </div>
);
