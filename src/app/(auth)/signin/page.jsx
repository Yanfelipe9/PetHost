import styles from './signin.module.css'
import logo from './d78db4d398303024c2fb933c6c51f79e 1 (Traced).png'
import Image from 'next/image'
import { Label } from '@/components/Label'
import { Button } from '@/components/Button'
import { ArrowFoward } from '@/components/icons/ArrowFoward'
import { TextDivider } from '@/components/TextDivider'
import { Providers } from '@/components/Providers'
import Link from 'next/link'
import { Login } from '@/components/icons/Login'
import { Checkbox } from '@/components/chekBox'
import { createUser } from '@/actions'
import { Input } from '@/components/input/input'
import FormLogin from '@/components/FormLogin/FormLogin'
export default function Signin() {
  return (
    <main className={styles.main}>
      <div className={styles.container_left}>
        <h1>
          <Image src={logo} alt="Logo" className={styles.logo} />
          PetHost
        </h1>
        <h2>Seu pet merece o melhor descanso, onde ele também se sente em casa!</h2>
      </div>
      <div className={styles.container}>
        <h1>Login</h1>
        <h2>Boas-vindas! Faça seu login.</h2>
        <FormLogin />
        
        <footer className={styles.footer}>
          <p>
            Não possui conta? <Link href='/signon'> Cadastre-se</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}