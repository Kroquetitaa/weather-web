import { useState } from 'react';
import { TRoutePaths } from '@interfaces/index';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '@components/TopBar/TopBar';
import { useAuthStore } from '@store/AuthStore';
import './LoginPage.scss';

interface LoginFormInputs {
  email: string;
  password: string;
}

const MOCK_CREDENTIALS = {
  email: import.meta.env.VITE_EMAIL,
  password: import.meta.env.VITE_PASSWORD
};

export const LoginPage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'page.Login' });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    if (data.email === MOCK_CREDENTIALS.email && data.password === MOCK_CREDENTIALS.password) {
      login(data.email);
      navigate(TRoutePaths.HOME);
    } else {
      setLoginError(t('errorCredentials'));
    }
  };

  return (
    <div>
      <TopBar />
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>{t('welcome')}</h2>

          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: t('emailInvalid')
                }
              })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('password')}</label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: t('passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('passwordInvalid')
                }
              })}
            />
            {errors.password && <p className="error">{errors.password.message}</p>}
          </div>

          {loginError && <p className="error">{loginError}</p>}

          <button type="submit" className="submit-button">
            {t('btnAccess')}
          </button>
        </form>
      </div>
    </div>
  );
};
