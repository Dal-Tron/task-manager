import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

interface ResizableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

export const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  value,
  onChange,
  placeholder = 'Enter text',
  maxLength = 300,
  className = '',
  disabled = false,
}) => {
  const [charCount, setCharCount] = useState(value.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;

    const newValue = e.target.value.slice(0, maxLength);
    onChange(newValue);
    setCharCount(newValue.length);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  return (
    <div className={clsx('w-full', className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={clsx(
          'w-full border-b-2 focus:outline-none focus:ring-0 bg-transparent resize-none overflow-hidden text-gray-900',
          {
            'border-gray-300 focus:border-blue-500 bg-white': !disabled,
            'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed':
              disabled,
          }
        )}
        rows={1}
        style={{ height: 'auto', minHeight: '2.5rem' }}
      />
      <div className="text-right text-sm text-gray-500">
        {charCount}/{maxLength}
      </div>
    </div>
  );
};
