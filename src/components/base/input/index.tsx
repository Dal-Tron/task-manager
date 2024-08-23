import clsx from 'clsx';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = 'Enter text',
  type = 'text',
  className = '',
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(
        'w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 py-3 px-5 text-lg',
        className
      )}
    />
  );
};
