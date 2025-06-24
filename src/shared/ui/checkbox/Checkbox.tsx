import * as Primitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}

export const Checkbox = ({ label, checked, onCheckedChange }: CheckboxProps) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <Primitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        'flex h-5 w-5 items-center justify-center rounded border border-input transition',
        checked && 'bg-primary text-primary-foreground'
      )}
    >
      <Primitive.Indicator>
        <Check className="h-4 w-4" />
      </Primitive.Indicator>
    </Primitive.Root>
    {label && <span className="text-sm">{label}</span>}
  </label>
);
