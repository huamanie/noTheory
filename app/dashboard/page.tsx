import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../components/images/mainLogo.png'
import '../../styles/globals.css'

export default function Dashboard() {
    return (
            <div className='flex flex-row border-4 border-solid border-yellow-600'>
                <div className='w-1/5 border-4 bg-green-2 border-solid border-red-400'> {/**Profile side */}
                    <div className='sticky top-0 z-10 bg-green-1 flex-col justify-center'> 
                        <div className='flex flex-col items-center'>
                            <div>
                                <Image
                                    src={Logo}
                                    width='100'
                                    height='100'
                                    alt='pro pic'
                                />
                            </div>
                            <div className='pt-3'>Name</div>
                            <div className='flex justify-center'>
                                Friends
                            </div>
                            <div className='flex justify-center'>
                                Current streak
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap flex-1 items-center justify-center border-4 border-solid border-orange-900'> {/*Lessons*/}
                    <div className='flex flex-col gap-10 border-4 border-solid border-green-500'>
                        <div className='flex flex-col gap-60'>
                            <Link href='/dashboard/lessons'>
                                <button className='rounded-full bg-green-1 w-32 h-32 relative'>
                                    <div className='absolute translate-x-1 -translate-y-14 font-extrabold text-5xl'>
                                        &#10003;
                                    </div>
                                    Lesson 1
                                </button>
                            </Link>
                            <button className='rounded-full bg-green-1 w-32 h-32'>
                                Lesson 2
                            </button>
                            <button className='rounded-full bg-green-1 w-32 h-32'>
                                Lesson 2
                            </button>
                            <button className='rounded-full bg-green-1 w-32 h-32'>
                                Lesson 2
                            </button>
                            <button className='rounded-full bg-green-1 w-32 h-32'>
                                Lesson 2
                            </button>
                            <button className='rounded-full bg-green-1 w-32 h-32'>
                                Lesson 2
                            </button>
                            <button className='rounded-full bg-green-1 w-32 h-32'>
                                Lesson 2
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
    )
}