import clsx from 'clsx';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
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
        'border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0',
        className
      )}
    />
  );
};
