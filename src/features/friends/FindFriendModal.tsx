import { useState } from 'react';
import { Modal } from '@/shared/ui/modal/Modal';
import { CloseButton } from '@/shared/ui/close-button/CloseButton';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/button/Button';
import { axiosInstance } from '@/shared/api/axiosInstance';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

interface FindFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserPreview {
  _id: string;
  username: string;
  email: string;
}

export const FindFriendModal = ({ isOpen, onClose }: FindFriendModalProps) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<UserPreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');


  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setMessage('');
    try {
      const { data } = await axiosInstance.get<UserPreview>(
        `/api/users/search?username=${encodeURIComponent(query)}`
      );
      setResult(data);
    } catch {
      setMessage('Пользователь не найден');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!result) return;
    try {
      await axiosInstance.post('/api/friends/request', { userId: result._id });
      setMessage('Заявка отправлена!');
    } catch {
      setMessage('Ошибка при отправке заявки');
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Поиск друзей">
      <CloseButton onClick={onClose} />

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Введите имя пользователя"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} disabled={loading}>
            Поиск
          </Button>
        </div>

        {loading && <Skeleton className="h-10 w-full" />}

        {result && (
          <div className="rounded-md border p-3 space-y-2">
            <div className="font-medium">{result.username}</div>
            <div className="text-sm text-muted-foreground">{result.email}</div>
            <Button onClick={handleAdd} className="w-full">
              Добавить в друзья
            </Button>
          </div>
        )}

        {message && (
          <p className="text-center text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </Modal>
  );
};
