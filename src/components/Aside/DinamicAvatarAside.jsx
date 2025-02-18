"use client";

import { useState } from "react";
import avatarDefault from './avatarDefault.webp';
import styles from './aside.module.css';
import Image from "next/image";

export const DinamicAvatarAside = ({ img1, img2 }) => {
    const [image, setImage] = useState(img2 ?? img1 ?? avatarDefault);

    return (
        <div className={styles.avatarContainer}>
            <Image
                className={styles.imageAvatar}
                src={image}
                width={50}
                height={50}
                alt="Avatar do usuário"
            />
        </div>
    );
};
