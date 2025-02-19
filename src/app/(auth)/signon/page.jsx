import styles from './signon.module.css'
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
export default async function SignOn() {
  return (
    <main className={styles.main}>
      <div className={styles.container_left}>
        <h1>PetHost</h1>
        <h2>Seu pet merece o melhor descanso, onde ele também se sente em casa!</h2>
      </div>
      <div className={styles.container}>
        <h1>
          Cadastro
        </h1>
        <h2>
          Olá! Preencha seus dados.
        </h2>
        <form className={styles.form} action={createUser}>
          <div>
            <Label>
              Nome
            </Label>
            <Input 
              name="name" 
              id="name" 
              placeholder="Nome completo" 
              required 
            />
          </div>
          <div>
            <Label>
              E-mail
            </Label>
            <Input 
              name="email" 
              id="email" 
              type="email" 
              placeholder="Digite seu e-mail" 
              required 
            />
          </div>
          <div>
            <Label>
              Senha
            </Label>
            <Input 
              name="password" 
              id="password" 
              type="password" 
              placeholder="Digite sua senha"
              required 
            />
          </div>
          <div className={styles.action}>
            <Button type="submit">
              Cadastrar 
            </Button>
          </div>
        </form>
        
      </div>
    </main>
  )
}