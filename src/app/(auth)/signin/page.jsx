
import styles from './signin.module.css'

import Link from 'next/link'
import FormLogin from '@/components/FormLogin/FormLogin'
export default function Signin() {
  return (
    <main className={styles.main}>
      <div className={styles.container_left}>
        <h1>PetHost</h1>
        <h2>Seu pet merece o melhor descanso, onde ele também se sente em casa!</h2>
      </div>
      <div className={styles.container}>
        <h1>
          Login
        </h1>
        <h2>
          Boas-vindas! Faça seu login.
        </h2>
        <FormLogin />
        
        <footer>
          <p>
            Não possui conta? <Link href='/signon'> Cadastre-se</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}