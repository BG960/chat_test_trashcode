import { LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

interface NavButtonProps {
  icon: LucideIcon;
  to: string;
}

export const NavButton = ({ icon: Icon, to }: NavButtonProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center justify-center w-12 h-12 rounded-lg hover:bg-accent transition-colors',
          isActive && 'bg-accent text-accent-foreground'
        )
      }
    >
      <Icon className="h-6 w-6" />
    </NavLink>
  );
};
