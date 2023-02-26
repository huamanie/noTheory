import React from "react";
// import Header from "./Header";
import NavBar from './NavBar'
// import '../styles/globals.css'

export default function RootLayout( {children}: {children: React.ReactNode} ) {
    return (
        <html lang="en">
            <head>
                <title>NoTheory</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}
    