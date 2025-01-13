import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BACKGROUND from '@assets/background.gif';
import styles from './AnimationPage.module.scss';

export const AnimationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 1500);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className={styles.container}>
      <img src={BACKGROUND} alt="Background animation" className={styles.image} />
    </div>
  );
};
