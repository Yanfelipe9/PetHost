"use client"
import Image from "next/image"
import { IconButton } from "../IconButton"
import {signIn} from "next-auth/react"

import githubImg from './github.png'

 const loginAtempt = ()=>{
    console.log("tentar fazer login via git")
    signIn("github",{
        callbackUrl : "/"
    })

 }

export const Github = (props) => {
    return (<IconButton {...props} onClick={loginAtempt}>
        <Image src={githubImg} alt="Github Logo" />
    </IconButton >)
}