  import { useAuth } from '../lib/AuthContext';
  import { Button } from '@/shared/ui/button/Button';
  import { Input } from '@/shared/ui/Input';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import * as z from 'zod';
  import { useState } from 'react';

  const registerSchema = z.object({
    username: z.string().min(3, 'Имя должно быть не короче 3 символов'),
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string()
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  export const RegisterForm = () => {
    const { register: registerUser } = useAuth();
    const [serverError, setServerError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
    });
  console.log('Ошибки формы:', errors);

    const onSubmit = async (data: RegisterFormData) => {
        console.log('⏩ onSubmit вызван с данными:', data);

      console.log('Форма отправлена', data);

      setServerError('');
      setIsSubmitting(true);
      try {
        await registerUser(data.username, data.email, data.password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setServerError(error?.response?.data?.error || 'Ошибка регистрации');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && <p className="text-red-500">{serverError}</p>}

        <Input
          placeholder="Имя пользователя"
          {...register('username')}
          error={errors.username?.message}
        />

        <Input
          placeholder="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          placeholder="Пароль"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          placeholder="Повторите пароль"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Регистрируем...' : 'Зарегистрироваться'}
        </Button>
      </form>
    );
  };
