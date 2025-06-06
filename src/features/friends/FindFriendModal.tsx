/* eslint-disable @typescript-eslint/no-unused-vars */
// src/features/friends/FindFriendModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import axios from '@/shared/api/client';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const FindFriendModal = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ _id: string; username: string }[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`/users/search?username=${encodeURIComponent(query)}`);
      setResults(res.data);
      setError('');
    } catch (err) {
      setError('Ошибка при поиске');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (userId: string) => {
    try {
      await axios.post('/friends/request', { userId });
      setResults((prev) => prev.filter((u) => u._id !== userId));
    } catch {
      setError('Не удалось отправить заявку');
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="scale-95 opacity-0" enterTo="scale-100 opacity-100" leave="ease-in duration-200" leaveFrom="scale-100 opacity-100" leaveTo="scale-95 opacity-0">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                  Найти друга
                </Dialog.Title>

                <div className="mt-4 flex">
                  <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-l border bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
                  >
                    Поиск
                  </button>
                </div>

                {error && (
                  <div className="mt-2 text-red-500 text-sm">{error}</div>
                )}

                <ul className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {results.map((user) => (
                    <li key={user._id} className="flex justify-between items-center p-2 rounded bg-gray-100 dark:bg-gray-700">
                      <span className="text-gray-900 dark:text-white">{user.username}</span>
                      <button
                        onClick={() => handleAddFriend(user._id)}
                        className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Добавить
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
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

export default FindFriendModal;