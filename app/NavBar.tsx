'use client'
import React from 'react'
import styles from '/styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../components/images/mainLogo.png'

export default function NavBar() {
    function toSecondPage(){
        if (typeof window !== undefined) {
            window.scrollTo({
                top: 1000,
                behavior:'smooth',
            })
        }
    }


    return (
        <div className='flex flex-row bg-green-1 justify-end'>
            {/* figure out how to make responsive layout for navbar */}
            {/* <div className='sm:flex sm:flex-row sm:flex-1 hidden'>
                <Image
                src={Logo}
                width='65'
                height='65'
                alt='logo'
                />
            </div> */}
            <div className='flex flex-row md:flex-2 gap-10 pr-4'>
                <button className='hover:bg-green-2 rounded-lg duration-500 text-xl font-semibold text-white py-4 px-1'>Contact Us</button>
                <button className='hover:bg-green-2 rounded-lg duration-500 text-xl font-semibold text-white py-4 px-1' onClick={toSecondPage}>Why NoTheory</button>
            </div>
        </div>
    )
}