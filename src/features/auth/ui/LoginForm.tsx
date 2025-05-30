import { useAuth } from '../lib/AuthContext';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
   resolver: zodResolver(loginSchema)

  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Форма валидна, данные:', data);

    setServerError('');
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setServerError(error?.response?.data?.error || 'Ошибка входа');
    } finally {
      setIsSubmitting(false);
    }
  };
console.log('useAuth:', { login });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && <p className="text-red-500">{serverError}</p>}

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

      <Button type= "submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Входим...' : 'Войти'}
      </Button>
    </form>
  );
  
};

