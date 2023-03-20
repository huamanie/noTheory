import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import '../styles/globals.css'
import Logo from '../components/images/mainLogo.png'

export default function FirstPage() {
    return (
        <div className='relative my-52'>
            <div className='flex flex-row flex-wrap gap-80'>
                <div className='flex flex-col justify-center flex-2'>
                    <h1 className="text-8xl font-bold text-green-1 mb-6">NoTheory</h1>
                    <h3 className='text-xl font-semibold text-gray-700 leading-loose mb-4'> 
                        We get it. It&apos;s confusing. But there&apos;s an easier way!
                        <br/>
                        Learn music theory fast through fun interactive exercises!
                    </h3>
                    <div className='flex flex-row gap-4'>
                        <div className='lg:flex-1'>
                            <button className="bg-green-1 hover:bg-green-2 text-white duration-500 py-0 px-3 mr-1 rounded-xl font-semibold text-xl w-full h-12">Get Started</button>
                        </div>
                        <div className='flex-1'>
                            <Link href='/lessons'>
                                <button className="bg-green-1 hover:bg-green-2 text-white duration-500 py-0 px-3 rounded-xl font-semibold text-xl w-full h-12">[DEMO]Login</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center item-center flex-1'>
                    <Image
                        src={Logo}
                        width='500'
                        height='500'
                        alt='logo'
                    />
                </div>
            </div>
        </div>
    )
}