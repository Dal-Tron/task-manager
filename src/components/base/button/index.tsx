import clsx from 'clsx';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={clsx(
        'py-2 px-4 rounded-md font-semibold',
        {
          'bg-blue-500 text-white hover:bg-blue-600': !disabled,
          'bg-gray-300 text-gray-500 cursor-not-allowed': disabled,
        },
        className
      )}
    >
      {text}
    </button>
  );
};
