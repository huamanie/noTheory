import React from 'react'
import Link from 'next/link'
import styles from '/styles/Home.module.css'
import '../styles/globals.css'

export default function FirstPage() {
    return (
        <div className="border-4 border-blue-700 border-solid">
            <h1 className="text-3xl">NoTheory</h1>
            <h3 >We get it. It&apos;s confusing. But there&apos;s an easier way</h3>
            <h4 >Learn music theory fast through fun interactive exercises!</h4>
            <button className="bg-gray-300 hover:bg-blue-700 text-black py-0 px-3 mr-1 rounded">Get Started</button>
            <Link href='/lessons'>
                <button className="bg-gray-300 hover:bg-blue-700 text-black py-0 px-3 rounded">DEMO/LOGIN</button>
           </Link>
            <hr />
        </div>
    )
}