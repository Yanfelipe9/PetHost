"use client"
import Image from "next/image"
import { Button } from "../Button"
import { useState } from "react"
import avatarDefault from './avatarDefault.webp'
import styles from "./profile-avatar.module.css"

export const ProfileImageUploader = ({ user }) => {
    const [image, setImageSrc] = useState(user.avatar ?? user.image ?? avatarDefault)
    const [newAvatar, setNewAvatar] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setNewAvatar(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSrc(reader.result)
                setShowModal(true)
            }
            reader.readAsDataURL(file)
        }
    }

    function uploadAvatar(event) {
        event.preventDefault()
        fetch('/api/profile', {
            method: "POST",
            body: newAvatar
        })


    }

    if (!user) {
        return null
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{user.name}</h2>
            <div className={styles.avatarContainer}>
                <Image
                    src={image}
                    width={150}
                    height={150}
                    className={styles.imageAvatar}
                    alt={`Avatar of ${user.name}`}
                />
            </div>
            <form onSubmit={uploadAvatar} className={styles.uploadForm}>
                <input
                    type="file"
                    required
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
                <Button className={styles.uploadButton}>Upload Img</Button>
            </form>
        </div>
    )
}
