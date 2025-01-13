import { IRouteDefinition, TRoutePaths } from '@interfaces/index';
import { AnimationPage, HomePage, LoginPage } from '@pages';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { Sidebar } from '@components/Sidebar/Sidebar';
import { TopBar } from '@components/TopBar/TopBar';
import { ContactPage } from '@pages/ContactPage/ContactPage';
import { useAuthStore } from '@store/AuthStore';

export const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={TRoutePaths.LOGIN} />;
  }

  return (
    <div className="private-route-container">
      <TopBar />
      <div className="private-content">
        <Sidebar />
      </div>
    </div>
  );
};

const GenericRedirect: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <Navigate to={TRoutePaths.HOME} /> : <Navigate to={TRoutePaths.LOGIN} />;
};

const routes: IRouteDefinition[] = [
  {
    path: TRoutePaths.ROOT,
    element: <AnimationPage />
  },
  {
    path: TRoutePaths.LOGIN,
    element: <LoginPage />
  },
  {
    path: TRoutePaths.APP,
    element: <PrivateRoute />,
    children: [
      {
        path: TRoutePaths.HOME,
        element: <HomePage />
      },
      {
        path: TRoutePaths.CONTACT,
        element: <ContactPage />
      }
    ]
  },
  {
    path: TRoutePaths.DEFAULT,
    element: <GenericRedirect />
  }
];

export const router = createBrowserRouter(routes);
