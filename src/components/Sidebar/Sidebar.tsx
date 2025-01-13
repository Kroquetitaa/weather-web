import { Link, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/AuthStore';
import './Sidebar.scss';
import { useTranslation } from 'react-i18next';
import { TRoutePaths } from '@interfaces/index';

export const Sidebar: React.FC = () => {
    const { t } = useTranslation('translation', {keyPrefix: 'components.Sidebar'})
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>{t('menu')}</h2>
        </div>
        <nav className="sidebar-nav">
        <ul>
            <li>
              <Link to="/app/home/Madrid">Madrid</Link>
            </li>
            <li>
              <Link to="/app/home/Mexico">Mexico</Link>
            </li>
            <li>
              <Link to="/app/home/Tokyo">Tokyo</Link>
            </li>
            <li>
              <Link to={TRoutePaths.CONTACT}>Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
