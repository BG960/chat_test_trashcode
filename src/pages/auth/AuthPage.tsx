import { useState } from 'react';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { RegisterForm } from '@/features/auth/ui/RegisterForm';
import { cn } from '@/shared/lib/utils';

export const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl mb-4">
              <span className="text-2xl">👋</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
              Добро пожаловать
            </h1>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              {mode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={cn(
                'flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200',
                mode === 'login'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              Вход
            </button>
            <button
              onClick={() => setMode('register')}
              className={cn(
                'flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200',
                mode === 'register'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              Регистрация
            </button>
          </div>

          {/* Forms */}
          <div className="space-y-6">
            {mode === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
              <button
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
              >
                {mode === 'login' ? 'Зарегистрируйтесь' : 'Войдите'}
              </button>
            </p>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Продолжая, вы соглашаетесь с нашими{' '}
            <a href="#" className="underline hover:no-underline">
              Условиями использования
            </a>{' '}
            и{' '}
            <a href="#" className="underline hover:no-underline">
              Политикой конфиденциальности
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default AuthPage