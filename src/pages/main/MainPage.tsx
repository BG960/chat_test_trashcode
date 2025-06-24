import { FC } from 'react';
import { AppLayout } from '@/shared/layouts/AppLayout';
import { ChatList } from '@/widgets/ChatList/ChatList';
import { ChatView } from '@/widgets/chat/ui/ChatView';
const MainPage: FC = () => {
  return (
    <AppLayout>
      <ChatList />
      <ChatView />
    </AppLayout>
  );
};

export default MainPage;
