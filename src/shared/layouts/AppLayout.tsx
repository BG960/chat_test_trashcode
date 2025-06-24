import { PropsWithChildren } from 'react';
import { Sidebar } from '@/widgets/sidebar/ui/sidebar';
import { Header } from '@/widgets/header/header';

export const AppLayout = ({ children }: PropsWithChildren) => (
  <div className="flex h-screen w-screen overflow-hidden">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex flex-1 overflow-hidden">{children}</main>
    </div>
  </div>
);
