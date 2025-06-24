// src/shared/ui/UserProfile.tsx
import { useAuth } from '@/features/auth/lib/AuthContext';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UserProfile = ({ onClose }: { onClose?: () => void }) => {  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
        onClick={openModal}
      >
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">
            {user?.username?.[0]?.toUpperCase()}
          </div>
        )}
      </button>
      <ProfileModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export const ProfileModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  const { user, logout } = useAuth();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-lg font-semibold mb-4">
                Профиль пользователя
              </Dialog.Title>
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                      {user?.username?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="text-center space-y-1">
                  <div className="text-lg font-medium">{user?.username}</div>
                  <div className="text-sm text-gray-500">{user?.email}</div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="text-red-500 hover:underline text-sm mr-4"
                  onClick={logout}
                >
                  Выйти
                </button>
                <button
                  className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={closeModal}
                >
                  Закрыть
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
