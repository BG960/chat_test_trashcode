import { LoginForm, RegisterForm } from '@/features/auth';
import { Logo } from '@/shared/ui';
import { useState } from 'react';

 const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
console.log('AuthPage ререндер:', isLogin);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="glass m-auto w-full max-w-md p-8 rounded-xl">
        <Logo className="mx-auto mb-6 h-16 w-16" />
        {isLogin ? (
          <>
            <LoginForm />
            <button 
              onClick={() => setIsLogin(false)}
              className="mt-4 text-white/70 hover:text-white"
            >
              Нет аккаунта? Зарегистрироваться
            </button>
          </>
        ) : (
          <>
            <RegisterForm />
            <button 
              onClick={() => setIsLogin(true)}
              className="mt-4 text-white/70 hover:text-white"
            >
              Уже есть аккаунт? Войти
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;