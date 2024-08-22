import React from 'react';

interface ButtonIconProps {
  onClick: () => void;
  icon: React.ElementType;
  srText: string;
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  onClick,
  icon: Icon,
  srText,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
  >
    <span className="sr-only">{srText}</span>
    <Icon aria-hidden="true" className="h-6 w-6" />
  </button>
);
