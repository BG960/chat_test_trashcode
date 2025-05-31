import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import axios from '@/shared/api/client';
import { useAuth } from '@/features/auth/lib/AuthContext';

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChatCreated: () => void;
}

export const CreateChatModal = ({ isOpen, onClose, onChatCreated }: CreateChatModalProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'private' | 'group'>('private');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCreate = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      await axios.post('/api/chats', {
        title,
        type,
        members: [user?._id], // Только создатель, позже добавим выбор участников
      });
      onChatCreated();
      onClose();
      setTitle('');
    } catch (error) {
      console.error('Ошибка при создании чата:', error);
    } finally {
      setLoading(false);
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
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Новый чат
                </Dialog.Title>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название чата"
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={() => setType('private')}
                      className={`flex-1 py-2 rounded border ${
                        type === 'private'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Приватный
                    </button>
                    <button
                      onClick={() => setType('group')}
                      className={`flex-1 py-2 rounded border ${
                        type === 'group'
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      Групповой
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={loading}
                    className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {loading ? 'Создание...' : 'Создать'}
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
