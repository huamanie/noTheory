import react, { useEffect, useState } from 'react'
import { Option } from './Option'

interface IProps {
    options:string[],
    onChange?:(selectedItems:number) => void,
    value?: number,
    labelText?: string,
    hasAnswered: boolean
}

export const ButtonGroup = ({options, onChange, value, labelText, hasAnswered}: IProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number|undefined>(value)

    useEffect(()=> {
        if (hasAnswered) {
            setSelectedIndex(undefined)
        }
    }, [selectedIndex, hasAnswered])
    
    function onSelect(index: number) {
        setSelectedIndex(index)
        onChange && onChange(index)
    }

    return (
        <div className='flex flex-row flex-wrap gap-6 justify-center'>
            { options.map((curr, index) => (
                <Option
                    key={index}
                    index={index}
                    selectedIndex={selectedIndex}
                    onSelect={(index) => onSelect(index)} 
                    hasAnswered={hasAnswered}>
                        {curr}
                </Option>
            ))}
        </div>
    )
}
