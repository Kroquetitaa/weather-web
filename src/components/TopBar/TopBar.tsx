import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@store/AuthStore';

import './TopBar.scss';

export const TopBar: React.FC = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'components.Topbar' });
  const [language, setLanguage] = useState(i18n.language);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className="topbar"
      style={{
        marginLeft: isAuthenticated ? 250 : 0,
        background: isAuthenticated ? 'linear-gradient(-135deg, #4c6ef5, #22b8cf)' : '#4c6ef5'
      }}
    >
      <div className="topbar-left">
        <select className="language-select" value={language} onChange={handleLanguageChange}>
          <option value="en">{t('en')}</option>
          <option value="es">{t('es')}</option>
        </select>
        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            {t('closeSession')}
          </button>
        )}
      </div>
    </div>
  );
};
