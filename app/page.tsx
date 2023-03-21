import Image from 'next/image'
import React from 'react'
import NavBar from './NavBar'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

export default function HomePage() {
    return (
        <>
            <NavBar/>
            <div className="grid place-content-center justify-items-center">
                <FirstPage/>
                <SecondPage/>
            </div>
        </>
    )
}
