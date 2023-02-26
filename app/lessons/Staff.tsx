'use client'
import React from 'react'

export default function Staff() {
    return (
        <div style={{"border": "green solid 1px", "paddingTop": "3rem", "paddingBottom": "3rem"}}>
            <div onClick={() => {console.log("G")}} style={{"margin": "auto", "backgroundColor":"white", "width": "60%", "height": "1em" }}></div>
            <div onClick={() => {console.log("F")}} style={{"margin": "auto", "backgroundColor":"black", "width": "60%", "height": "0.7em" }}></div>
            <div onClick={() => {console.log("E")}} style={{"margin": "auto", "backgroundColor":"white", "width": "60%", "height": "1em" }}></div>
            <div onClick={() => {console.log("D")}} style={{"margin": "auto", "backgroundColor":"black", "width": "60%", "height": "0.7em" }}></div>
            <div onClick={() => {console.log("C")}} style={{"margin": "auto", "backgroundColor":"white", "width": "60%", "height": "1em" }}></div>
            <div onClick={() => {console.log("B")}} style={{"margin": "auto", "backgroundColor":"black", "width": "60%", "height": "0.7em" }}></div>
            <div onClick={() => {console.log("A")}} style={{"margin": "auto", "backgroundColor":"white", "width": "60%", "height": "1em" }}></div>
            <div onClick={() => {console.log("G")}} style={{"margin": "auto", "backgroundColor":"black", "width": "60%", "height": "0.7em" }}></div>
            <div onClick={() => {console.log("F")}} style={{"margin": "auto", "backgroundColor":"white", "width": "60%", "height": "1em" }}></div>
            <div onClick={() => {console.log("E")}} style={{"margin": "auto", "backgroundColor":"black", "width": "60%", "height": "0.7em" }}></div>
            <div onClick={() => {console.log("D")}} style={{"margin": "auto", "backgroundColor":"white", "width": "60%", "height": "1em" }}></div>
        </div>
    )
}