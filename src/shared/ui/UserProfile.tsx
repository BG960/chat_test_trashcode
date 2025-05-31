import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/lib/AuthContext';
import axios from '@/shared/api/client';

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/me');
        setProfile(res.data);
      } catch (err) {
        console.error('Ошибка при загрузке профиля', err);
      }
    };

    if (isOpen) fetchProfile();
  }, [isOpen]);

  return (
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white text-sm font-bold">
        {user.username ? user.username[0].toUpperCase() : '?'}
      </div>
      <div className="hidden md:flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-2 text-blue-500 hover:underline text-sm"
      >
        Профиль
      </button>
      <button
        onClick={logout}
        className="ml-2 text-red-500 hover:underline text-sm"
      >
        Выйти
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                    Мой профиль
                  </Dialog.Title>

                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src="/default-avatar.png"
                      alt="Аватар"
                      className="w-16 h-16 rounded-full object-cover bg-gray-200 dark:bg-gray-700"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {profile?.username || 'Имя пользователя'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile?.email || 'email@example.com'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                      onClick={() => setIsOpen(false)}
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
    </div>
  );
};