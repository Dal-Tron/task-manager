import clsx from 'clsx';
import { useEffect, useState, useRef, FC } from 'react';

interface ResizableTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

export const ResizableTextarea: FC<ResizableTextareaProps> = ({
  value,
  onChange,
  placeholder = 'Enter text',
  maxLength = 300,
  className = '',
  disabled = false,
}) => {
  const [charCount, setCharCount] = useState(value.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCharCount(value.length);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    onChange(e);
    setCharCount(newValue.length);
  };

  return (
    <div className={clsx('w-full', className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className="w-full border-b-2 focus:outline-none focus:ring-0 bg-transparent resize-none overflow-hidden text-gray-900"
        rows={1}
        style={{ height: 'auto', minHeight: '2.5rem' }}
      />
      <div className="text-right text-sm text-gray-500">
        {charCount}/{maxLength}
      </div>
    </div>
  );
};
