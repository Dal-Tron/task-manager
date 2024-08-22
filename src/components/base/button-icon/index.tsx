import clsx from 'clsx';

interface ButtonIconProps {
  className: string;
  icon: React.ElementType;
  onClick: () => void;
  srText: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  className,
  icon: Icon,
  onClick,
  srText,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      '-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700',
      className
    )}
  >
    <span className="sr-only">{srText}</span>
    <Icon aria-hidden="true" className="h-6 w-6" />
  </button>
);
