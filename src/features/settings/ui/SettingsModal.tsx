// features/settings/ui/SettingsModal.tsx
import { Modal } from '@/shared/ui/modal/Modal';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Настройки">
      <div className="space-y-4">
        <p className="text-muted-foreground">Здесь будут настройки профиля, темы и т.д.</p>
        <button onClick={onClose} className="text-sm underline text-primary">
          Закрыть
        </button>
      </div>
    </Modal>
  );
};
