import React from 'react'
import styles from '/styles/Home.module.css'
import Link from 'next/link'

export default function NavBar() {
    return (
        <div className={styles.navBar} style={{"border": "green solid 3px"}}>
            <button className={styles.contactButton}>Contact Us</button>
            <button className={styles.whyButton}>Why NoTheory</button>
            <Link href='/lessons'>
                <button className={styles.demoButton}>DEMO/LOGIN</button>
            </Link>
        </div>
    )
}