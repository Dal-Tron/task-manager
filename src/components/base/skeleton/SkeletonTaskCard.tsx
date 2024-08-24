import clsx from 'clsx';

interface SkeletonTaskCardProps {
  className?: string;
}

export const SkeletonTaskCard: React.FC<SkeletonTaskCardProps> = ({
  className,
}) => (
  <div
    className={clsx(
      'relative animate-pulseWiggle bg-gray-300 h-48 rounded-lg flex items-center justify-center',
      className
    )}
  >
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-500" />
  </div>
);
