import { useNavigate } from 'react-router-dom';
import { CreateChatModal as CreateChatModalBase } from '@/features/chat/ui/CreateChatModal';
import { FindFriendModal as FindFriendModalBase } from '@/features/friends/FindFriendModal';
import { ProfileModal as ProfileModalBase } from '@/features/auth/ui/ProfileModal';

/* ——— Create Chat ——— */
export const CreateChatModal = () => {
  const navigate = useNavigate();
  return (
    <CreateChatModalBase isOpen onClose={() => navigate(-1)} />
  );
};

/* ——— Find Friend ——— */
export const FindFriendModal = () => {
  const navigate = useNavigate();
  return (
    <FindFriendModalBase isOpen onClose={() => navigate(-1)} />
  );
};

/* ——— Profile ——— */
export const ProfileModal = () => {
  const navigate = useNavigate();
  return (
    <ProfileModalBase isOpen={true} onClose={() => navigate(-1)} />
  );
};
