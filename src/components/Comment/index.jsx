import Image from "next/image"
import styles from './comment.module.css'
import { Avatar } from "../Avatar"

export const Comment = ({ comment }) => {



    const imageSrc = comment.author.avatar ?? comment.author.image
    const name = comment.author.name

    return (<div className={styles.comment}>
        {imageSrc && (<Avatar
            imageSrc={imageSrc}
            name={name}
        />)}
        
        <p>{comment.text}</p>
    </div>)
}