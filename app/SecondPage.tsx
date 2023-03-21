import React from 'react'
import '../styles/globals.css'
import styles from '/styles/Home.module.css'
import Image from 'next/image'
import Logo from '../components/images/mainLogo.png'
import Link from 'next/link'

export default function SecondPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className='my-4 m-auto w-full h-0.5 rounded-full relative border-gray-400 border-2 border-solid'></div> {/* line break */}
            <div className='flex justify-center mb-10 mt-20'>
                <Image
                    src={Logo}
                    width='150'
                    height='150'
                    alt='logo'
                />
            </div>
            <div className='flex flex-col justify-center w-3/4'>
                <h2 className='font-bold text-green-1 text-center text-3xl mb-10'>What makes NoTheory different?</h2> 
                <h3 className='text-center text-xl mb-4'>
                    Instead of spending hours behind pages of text, jump right
                    into it with interactive lessons.
                </h3>
                <h3 className='text-center text-xl mb-20'>
                    Need extra assistance? No worries? Each lesson provides extra details
                    if needed. Less pages of text and more examples.
                </h3>
            </div>
            <div className='my-4 m-auto w-full h-0.5 rounded-full relative border-gray-400 border-2 border-solid'></div> {/* line break */}
            <div className='flex flex-col justify-center w-3/4 mb-20'>
                <h2 className='font-bold text-green-1 text-center text-3xl mb-10 mt-20'>Why learn Music Theory?</h2>
                <h3 className='text-center text-xl mb-10'>
                    Not only will it expand your knowledge of music, but it is
                    the foundation that can help construct your own music and
                    understand any musical piece. No matter what instrument.
                </h3>
                <div className='flex justify-center'>
                    <Link href='/lessons'>
                        <button className='bg-green-1 hover:bg-green-2 text-white rounded-xl font-semibold px-3 text-xl h-12 w-56'> Learn NOW</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}