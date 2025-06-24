import { X } from 'lucide-react';

interface Props {
  onClick: () => void;
}

export const ModalCloseButton = ({ onClick }: Props) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-4 z-50 text-muted-foreground hover:text-foreground"
  >
    <X size={20} />
  </button>
);
