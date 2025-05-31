import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth/lib/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Неверный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useAuth();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      if (isRegister) {
        await register(data.username, data.email, data.password);
      } else {
        await login(data.email, data.password);
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {isRegister ? 'Регистрация' : 'Вход'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <div>
              <input
                {...formRegister('username')}
                placeholder="Имя пользователя"
                className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}
          <div>
            <input
              {...formRegister('email')}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...formRegister('password')}
              type="password"
              placeholder="Пароль"
              className="w-full px-4 py-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
          >
            {isRegister ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          {isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline"
          >
            {isRegister ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

