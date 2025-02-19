'use client'

import styles from './form-login.module.css'
import { Label } from '@/components/Label'
import { Button } from 'antd'
import { useState } from 'react'
import { Input } from '../input/input'
import { signIn } from 'next-auth/react'

export default function FormLogin() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginAttempt = async (event) => {

        event.preventDefault()
        signIn("credentials", {
            callbackUrl : "/",
            email,
            password
        })
    }

    return (
        <form className={styles.form} onSubmit={loginAttempt}>
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
                    onChange={event => setEmail(event.target.value)}
                    value={email}
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
                    required
                    placeholder="Digite sua Senha"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </div>
            <div className={styles.action}>
                <button 
                    type='primary'
                    htmlType='submit'
                    className={styles.buttonCustom}>
                    Entrar
                </button>
                {/* <Button
                    type="primary"
                    htmlType="submit"
                >
                    Entrar
                </Button>       */}
            </div>
        </form>
    )
}