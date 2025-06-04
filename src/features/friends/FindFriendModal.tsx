// src/features/friends/FindFriendModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import axios from '@/shared/api/client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type User = {
  _id: string;
  username: string;
  email: string;
};

export const FindFriendModal = ({ isOpen, onClose }: Props) => {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setMessage('');
      setError('');
      const res = await axios.get(`/api/users/search?username=${search}`);
      setResult(res.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Пользователь не найден');
      setResult(null);
    }
  };

  const handleAddFriend = async () => {
    try {
      if (!result) return;
      await axios.post('/api/friends', { userId: result._id });
      setMessage('Заявка отправлена!');
      setError('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Ошибка при отправке заявки');
    }
  };

  const close = () => {
    setSearch('');
    setResult(null);
    setMessage('');
    setError('');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={close}>
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
                  Найти друга
                </Dialog.Title>

                <div className="mt-4 flex space-x-2">
                  <input
                    type="text"
                    placeholder="Введите имя пользователя"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Поиск
                  </button>
                </div>

                {result && (
                  <div className="mt-4 p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                    <div><strong>{result.username}</strong> — {result.email}</div>
                    <button
                      onClick={handleAddFriend}
                      className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Добавить в друзья
                    </button>
                  </div>
                )}

                {message && (
                  <div className="mt-2 text-green-500 text-sm">{message}</div>
                )}
                {error && (
                  <div className="mt-2 text-red-500 text-sm">{error}</div>
                )}

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={close}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Закрыть
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
