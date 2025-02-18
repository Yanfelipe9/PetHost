import logo from './logo.png';
import Link from 'next/link';
import AsideLink from '../AsideLink';
import Image from 'next/image';
import { Feed } from '../icons/Feed';
import { Account } from '../icons/Account';
import { Info } from '../icons/info';
import { Login } from '../icons/Login';
import { Button } from '../Button';
import styles from './aside.module.css';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import db from 'prisma/db';
import { DinamicAvatarAside } from './DinamicAvatarAside';

export const Aside = async () => {
    const session = await getServerSession(options);
    const dataImgUserData = session ? await db.user.findUnique({
        where: {
            email: session.user.email,
        },
    }) : null;

    return (
        <aside className={styles.aside}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href="/">
                        <Image src={logo} alt="Logo da Code Connect" />
                    </Link>
                </div>
                <ul className={styles.navList}>
                    <li>
                        <Button href="/publish" outline>
                            Publicar
                        </Button>
                    </li>
                    <li>
                        <AsideLink href="/">
                            <Feed />
                            Feed
                        </AsideLink>
                    </li>
                    <li>
                        <AsideLink href="/Profile">
                            <Account />
                            Perfil
                        </AsideLink>
                    </li>
                    <li>
                        <AsideLink href="/about">
                            <Info />
                            Sobre nós
                        </AsideLink>
                    </li>
                    {session && (
                        <li className={styles.avatarContainer}>
                            <DinamicAvatarAside img1={session.user.image} img2={dataImgUserData.avatar} />
                        </li>
                    )}
                    {!session && (
                        <li>
                            <AsideLink href="/api/auth/signin">
                                <Login /> Login
                            </AsideLink>
                        </li>
                    )}
                    {session && (
                        <li>
                            <AsideLink href="/api/auth/signout">
                                <Login /> Logout
                            </AsideLink>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
};
