import { options } from '@/app/api/auth/[...nextauth]/options'
import { ProfileImageUploader } from '@/components/ProfileImageUploader'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import db from 'prisma/db'
import React from 'react'

export default async function Profile() {


    const session =  await getServerSession(options)

    if (!session || !session.user) {
        redirect("/api/auth/signin?callbackUrl=/Profile");
    }

    //esse ?callbackulr = vai ser a rota que usario for apos fazer login
 
     //em vez de pegar os dados da session ele vai pega dire do banco para fze a troca da img
     //pois se ele pegaasse da sessção teria que fica autlizando o token para vir com os dados da nova imagem
     //dava para fazer isso extendendo a session la no otions pegando de token.user.avatar e = session.user.avatar
     //ai vc teria o valor da img do user padrao git e do avatar, que seria a que o usuario escolheu
     
     const userDb = await db.user.findUnique({
        where : {
            email : session.user.email
        }
     })
  
      //fazemdp isso a logica de olha para o avatar, dps para o img e dps para defaull, tem que funcionar pq o user
      //que vem direto do database , tem todos os campos agora o da session vai varear do auth,

      //mas era so extende a session que ia funcionar do mesmo jeito

    return (
        <section>
            <h1 style={{ color: 'white' }}>Profile</h1>

            <ProfileImageUploader user={userDb} />

        </section>
    )
}
