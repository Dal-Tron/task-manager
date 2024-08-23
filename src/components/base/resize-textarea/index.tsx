import clsx from 'clsx';
import React, { useRef, useState } from 'react';

interface ResizableTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export const ResizableTextarea: React.FC<ResizableTextareaProps> = ({
  value,
  onChange,
  placeholder = 'Enter text',
  maxLength = 300,
  className = '',
}) => {
  const [charCount, setCharCount] = useState(value.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.slice(0, maxLength);
    onChange(newValue);
    setCharCount(newValue.length);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className={clsx('w-full', className)}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 bg-transparent resize-none overflow-hidden text-gray-900"
        rows={1}
        style={{ height: 'auto', minHeight: '2.5rem' }}
      />
      <div className="text-right text-sm text-gray-500">
        {charCount}/{maxLength}
      </div>
    </div>
  );
};
