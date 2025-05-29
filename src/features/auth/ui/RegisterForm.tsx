import { useAuth } from '../lib/useAuth';
import { Button} from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  username: z.string().min(3, 'Имя должно быть не менее 3 символов'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

    const { getValues } = useForm<RegisterFormData>();
  
  const emailValue = getValues('email');
  const passwordValue = getValues('password');
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.username, data.email, data.password);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Имя пользователя"
          value={emailValue}
          {...register('username')}
          error={errors.username?.message}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={emailValue}
          {...register('email')}
          error={errors.email?.message}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Пароль"
          value={passwordValue}
          {...register('password')}
          error={errors.password?.message}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Подтвердите пароль"
          value={passwordValue}
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>
      <Button className="w-full">
        Зарегистрироваться
      </Button>
    </form>
  );
};