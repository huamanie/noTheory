import Image from 'next/image'
import React from 'react'
import styles from '/styles/Home.module.css'
import NavBar from './NavBar'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

export default function HomePage() {
    return (
        <div className="border-4 border-solid border-red-700">
            <NavBar/>
            <FirstPage/>
            <SecondPage/>
        </div>
    )
}
