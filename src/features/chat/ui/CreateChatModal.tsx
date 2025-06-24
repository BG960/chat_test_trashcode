import { useEffect, useState } from 'react';
import { Modal } from '@/shared/ui/modal/Modal';
import { CloseButton } from '@/shared/ui/close-button/CloseButton';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/button/Button';
import { axiosInstance } from '@/shared/api/axiosInstance';
import { useAuth } from '@/features/auth/lib/AuthContext';
import { Checkbox } from '@/shared/ui/checkbox/Checkbox';

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Friend {
  _id: string;
  username: string;
}

export const CreateChatModal = ({ isOpen, onClose }: CreateChatModalProps) => {
  const [title, setTitle] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState('');

  const { user } = useAuth();

  
  useEffect(() => {
    if (!isOpen || !isGroup) return;
    (async () => {
      try {
        const { data } = await axiosInstance.get<Friend[]>('/api/friends');
        setFriends(data);
      } catch {
        setFriends([]);
      }
    })();
  }, [isOpen, isGroup]);

  const toggleFriend = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  
  const handleCreate = async () => {
    if (!title.trim()) return setError('Укажите название чата');

    const members = isGroup
      ? [user?._id, ...selected]
      : [user?._id, ...selected.slice(0, 1)];

    if (members.length < 2) return setError('Выберите собеседника');

    try {
      await axiosInstance.post('/api/chats', {
        title,
        isGroup,
        members,
      });
      onClose();
      // здесь можно инвалидацию useChats
    } catch {
      setError('Ошибка при создании');
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Новый чат">
      <CloseButton onClick={onClose} />

      <div className="space-y-4">
        <Input
          placeholder="Название чата"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />

        <Checkbox
          label="Групповой чат"
          checked={isGroup}
          onCheckedChange={(v) => setIsGroup(Boolean(v))}
        />

        {isGroup && (
          <div className="max-h-40 space-y-1 overflow-y-auto border rounded-md p-2">
            {friends.map((f) => (
              <Checkbox
                key={f._id}
                label={f.username}
                checked={selected.includes(f._id)}
                onCheckedChange={() => toggleFriend(f._id)}
              />
            ))}
            {!friends.length && (
              <p className="text-sm text-muted-foreground text-center py-4">
                Друзей нет
              </p>
            )}
          </div>
        )}

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleCreate}>Создать</Button>
        </div>
      </div>
    </Modal>
  );
};
