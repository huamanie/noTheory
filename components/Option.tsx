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

    return (
        <button className={`flex justify-center items-center text-3xl font-semibold text-black border-4 border-solid border-gray-700 rounded-2xl w-16 h-16 ${isSelected && 'ring-green-1 ring-4 duration-200'}`} onClick={() => props.onSelect(props.index)}>
            {props.children}
        </button> 
    )
}