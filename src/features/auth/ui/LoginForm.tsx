import { useAuth } from '../lib/useAuth';
import { Button} from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const loginSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен быть не менее 6 символов')
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const { getValues } = useForm<LoginFormData>();

const emailValue = getValues('email');
const passwordValue = getValues('password');
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
<Button className="w-full">
  Войти
</Button>
</form>
  );
};