import { ChangeEvent, KeyboardEvent } from 'react';

type InputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  error?: string
  type?: string

};

export const Input = ({ value, onChange, placeholder, onKeyPress }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      className="flex-1 glass bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
    />
  );
};