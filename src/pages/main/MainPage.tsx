import { FC } from 'react';
import { AppLayout } from '@/shared/layouts/AppLayout';
import { Outlet } from 'react-router-dom';
import { ChatList } from '@/widgets/ChatList/ChatList';
import { ChatView } from '@/widgets/chat/ui/ChatView';
const MainPage: FC = () => {
  return (
    <AppLayout>
      <ChatList />
      <ChatView />
       <Outlet />
    </AppLayout>
  );
};

export default MainPage;
