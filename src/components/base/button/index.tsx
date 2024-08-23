import clsx from 'clsx';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600',
        className
      )}
    >
      {text}
    </button>
  );
};
