// src/features/chat/CreateChatModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAuth } from '@/features/auth/lib/AuthContext';
import axios from '@/shared/api/client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CreateChatModal = ({ isOpen, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [isGroup, setIsGroup] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleCreate = async () => {
    try {
      if (!title.trim()) return setError('Название обязательно');
      await axios.post('/api/chats', {
        title,
        isGroup,
        members: [user?._id],
      });
      onClose();
    } catch (err) {
      setError('Ошибка при создании чата');
      console.error(err);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                  Создание чата
                </Dialog.Title>

                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Название чата"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="mt-4 flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isGroup}
                    onChange={(e) => setIsGroup(e.target.checked)}
                    id="isGroup"
                  />
                  <label htmlFor="isGroup" className="text-gray-700 dark:text-gray-300">
                    Групповой чат
                  </label>
                </div>

                {error && (
                  <div className="mt-2 text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-end space-x-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Создать
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
