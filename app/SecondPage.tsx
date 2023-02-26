import React from 'react'
import '../styles/globals.css'
import styles from '/styles/Home.module.css'



export default function SecondPage() {
    return (
        <div className="border-4 border-solid border-gray-500">
           <h2>What makes NoTheory different?</h2> 
           <h3>
            Instead of spending hours behind pages of text, jump right
            into it with interactive lessons.
           </h3>
           <h3>
            Need extra assistance? No worries? Each lesson provides extra details
            if needed. Less pages of text and more examples.
           </h3>
           <hr/>
           <h2>Why learn Music Theory?</h2>
           <h3>
            Not only will it expand your knowledge of music, but it is
            the foundation that can help construct your own music and
            understand any musical piece. No matter what instrument.
           </h3>
        </div>
    )
}