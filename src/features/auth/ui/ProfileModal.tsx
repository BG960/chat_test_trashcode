import { useState, ChangeEvent } from 'react';
import { Modal } from '@/shared/ui/modal/Modal';
import { CloseButton } from '@/shared/ui/close-button/CloseButton';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/button/Button';
import { useAuth } from '@/features/auth/lib/AuthContext';
import { axiosInstance } from '@/shared/api/axiosInstance';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState(user?.username ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar ?? null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSave = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setMsg('');
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = await axiosInstance.put('/api/auth/me', {
        username,
        avatar: avatarUrl,
      });
      // можно инвалидацию useAuth
      setMsg('Профиль обновлён');
    } catch {
      setMsg('Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };


  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setMsg('');
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const { data } = await axiosInstance.post('/api/auth/avatar', formData);
      setAvatarUrl(data.avatar);
    } catch {
      setMsg('Ошибка загрузки аватара');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Профиль">
      <CloseButton onClick={onClose} />

      {!user ? (
        <Skeleton className="h-28 w-full" />
      ) : (
        <div className="space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <label className="relative inline-block cursor-pointer">
              <img
                src={avatarUrl ?? '/default-avatar.png'}
                alt="avatar"
                className="h-20 w-20 rounded-full object-cover border border-border"
              />
              <input type="file" className="hidden" onChange={handleAvatarChange} />
              <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                ✎
              </span>
            </label>
            <span className="text-sm text-muted-foreground">Сменить аватар</span>
          </div>

         
<div className="space-y-3">
  <label>Имя пользователя</label>
  <Input value={username} onChange={(e) => setUsername(e.target.value)} />
  <label>Email</label>
  <Input value={user.email} disabled />
</div>

          {msg && (
            <p className="text-center text-sm text-muted-foreground">{msg}</p>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="secondary" onClick={logout}>
              Выйти
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
