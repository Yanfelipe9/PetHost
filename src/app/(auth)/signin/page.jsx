import Image from 'next/image'
import banner from './banner-signin.png'
import styles from './signin.module.css'

import Link from 'next/link'
import { Login } from '@/components/icons/Login'

import { TextDivider } from '@/components/TextDivider'
import { Providers } from '@/components/Providers'
import FormLogin from '@/components/FormLogin/FormLogin'
export default function Signin() {
  return (
    <main className={styles.main}>
      <div>
        <Image src={banner} alt='Banner' priority />
      </div>
      <div className={styles.container}>
        <h1>
          Login
        </h1>
        <h2>
          Boas-vindas! Faça seu login.
        </h2>
        <FormLogin />
        <div className={styles.providers}>
          <TextDivider text="ou entre com outras contas" />
          <Providers />
        </div>
        <footer className={styles.footer}>
          <p>
            Ainda não tem conta? 
          </p>
          <p>
          <Link href='/signon'>Crie seu cadastro! <Login color="#81FE88" /></Link>
          </p>
        </footer>
      </div>
    </main>
  )
}