import { create } from 'zustand';

interface ChatStore {
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
}));
