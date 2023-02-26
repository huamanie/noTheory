import react, { useState } from 'react'
import {notes} from '../components/globals/globals'

interface IProps {
    index: number,
    selectedIndex?: number,
    onSelect:(index:number)=> void,
    hasAnswered: boolean,
    children: React.ReactNode,
}


export const Option = (props:IProps) => {
    const isSelected = props.index === props.selectedIndex && !props.hasAnswered
    // console.log('render in option')
    return (
        <button className={`flex justify-center items-center text-5xl border-4 border-solid border-black rounded-lg w-20 h-20 ${isSelected && 'ring-green-500 ring-4 duration-200'}`} onClick={() => props.onSelect(props.index)}>
            {props.children}
        </button> 
    )
}