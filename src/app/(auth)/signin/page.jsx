import styles from './signin.module.css';
import logo from './d78db4d398303024c2fb933c6c51f79e 1 (Traced).png';
import Image from 'next/image';
import FormLogin from '@/components/FormLogin/FormLogin';
import { Col, Row } from 'antd';

export default function Signin() {
  return (
    <main className={styles.main}>
      <div className={styles.container_left}>
        <div className={styles.container_left_title}>
          <Image src={logo} alt="Logo" className={styles.logo} />
          <h1>
            PetHost
          </h1>
        </div>
        <h2 className={styles.h2}>Seu pet merece o melhor descanso, onde ele também se sente em casa!</h2>
      </div>

      <div className={styles.container}>
        <FormLogin />
      </div>
    </main>
  );
}
