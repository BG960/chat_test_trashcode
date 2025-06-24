import {motion} from 'framer-motion';

interface Props {
  onClick?: () => void;
}

export const ModalOverlay = ({ onClick }: Props) => (
  <motion.div
    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
);
