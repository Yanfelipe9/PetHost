import Image from "next/image"
import styles from './avatar.module.css'




export const Avatar = ({ name, imageSrc }) => {
    return (<ul className={styles.avatar}>
        <li>
            <Image className={styles.imageAvatar} src={imageSrc} width={32} height={32} alt={`Avatar do(a) ${name}`} />
        </li>
        {name && (<li>
            <strong className={styles.textName}>@{name}</strong>
        </li>)}

    </ul>)
}