'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../../styles/globals.css'
import {notes} from '../../components/globals/globals'
import Staff from './Staff'
import { ButtonGroup } from '../../components/ButtonGroup'
import vexflow, { Factory, EasyScore, System, Renderer, Stave, StaveNote, Voice, Formatter, Stem, Annotation, drawDot, RenderContext, ModifierContext, TickContext } from 'vexflow'

//Testing TexFlow
function draw(
    note: StaveNote,
    stave: Stave,
    context: RenderContext,
    x: number,
    drawBoundingBox: boolean = false,
    addModifierContext: boolean = true
) {
    note.setStave(stave)

    if (addModifierContext) {
        note.addToModifierContext(new ModifierContext());
    }
    
    new TickContext().addTickable(note).preFormat().setX(x);
    note.setContext(context).draw();

    if (drawBoundingBox) {
        const bb = note.getBoundingBox();
        context.rect(bb.getX(), bb.getY(), bb.getW(), bb.getH());
        context.stroke();
    }
    return note;
}

// const colorDecendants = (parentItem: SVGElement, color: string) => () => {
//     parentItem.querySelectorAll('*').forEach((child) => {
//         child.setAttribute('fill', color);
//         child.setAttribute('stroke', color);
//     })
// }

function getRandomArbitrary(min: number=1, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}


const addRandomSingleNote = (lowestRange: number, highestRange: number) => {

    let randomNote = getRandomArbitrary(0,notes.length) % notes.length
    let randomOctave = getRandomArbitrary(lowestRange, highestRange+1)

    return notes[randomNote] + '/' + randomOctave
}


export default function Lesson1() {

    const totalQuestions = 10
    const [isCorrect, setIsCorrect] = useState(false)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [answer, setAnswer] = useState((lowestRange: number = 4, highestRange: number = 5) => {
        let randomNote = getRandomArbitrary(0, notes.length) % notes.length
        let randomOctave = getRandomArbitrary(lowestRange, highestRange+1)
        return notes[randomNote] + '/' + randomOctave
    })

    const userAns = {note: '', octave: ''}

    useEffect(() => {
            document.getElementById('output')?.replaceChildren();
            const renderer = new Renderer("output", Renderer.Backends.SVG)
            renderer.resize(253, 250)

            const context = renderer.getContext()
            context.scale(2.5, 2.5)

            const stave = new Stave(0,0, 100)
            stave.addClef("treble").setContext(context).draw()
            
            console.log(answer)
            let notesToStave = new StaveNote({keys: [answer], duration: 'w'})

            let finalize = draw(notesToStave, stave, context, 1*15)

    }, [currentQuestion])


    function isUserCorrect() {
        if (userAns.note !== '' && userAns.octave !== '') setHasAnswered(true)

        if ((userAns.note + '/' + userAns.octave) === answer) setIsCorrect(true)
    }

    function nextQuestion() {
        setCurrentQuestion(currentQuestion + 1)
        setIsCorrect(false)
        setHasAnswered(false)
        setAnswer(addRandomSingleNote(4,5))
    }

    return (
        <div className="border-4 border-solid border-red-700 ">
            <div className="border-4 border-solid border-orange-600 text-center text-4xl">Question {currentQuestion}</div>
            <div id="output" className="grid place-items-center border-4 border-solid border-blue-700"></div>
            <div className='grid place-items-center border-4 border-solid border-gray-700 text-3xl p-3'>Identify the note and octave.</div> 
            <div className={`border-4 border-solid border-green-700 p-1 ${ hasAnswered ? 'pointer-events-none': ''}`}>
                <ButtonGroup
                    onChange={(index) => {
                        userAns.note = notes[index]
                        console.log(userAns)
                        isUserCorrect()
                    }}
                    labelText={'Notes'}
                    options={notes.map(val => val.toUpperCase())} 
                    />                
            </div>
            <div className={`border-4 border-solid border-purple-400 ${ hasAnswered ? 'pointer-events-none' : ''}`}>
                <ButtonGroup
                    onChange={(index) => {
                        userAns.octave = String(index+1)
                        console.log(userAns)
                        isUserCorrect()
                    }}
                    labelText={'Notes'}
                    options={['1', '2', '3', '4', '5', '6', '7']} 
                    />                
            </div>
            <div className={`border-4 border-solid border-purple-700 flex justify-center text-3xl gap-10 ${hasAnswered ? '' : 'hidden'}`}>
                    { isCorrect ? <h3> Correct! </h3>: <h3> Incorrect :&#40; </h3>}
                    <button className='' onClick={nextQuestion}> Continue. </button>
            </div>
        </div>  
    )
}
    //TEMPLATE

    // useEffect(() => {
    //     if (!renderAfter) {
    //         const renderer = new Renderer("output", Renderer.Backends.SVG)
    //         renderer.resize(1010, 315)

    //         const context = renderer.getContext()
    //         context.scale(2.5, 2.5)

    //         const stave = new Stave(0,0, 400)
    //         stave.addClef("treble")//.addTimeSignature("4/4")
    //         stave.setContext(context).draw()

    //         // TODO: Can split this to separate functions
    //         //add more notes with list
    //         const notes = 
    //             new StaveNote({keys: ['g/4', 'c/4'], duration: 'w', stem_direction: Stem.UP}).addModifier(new Annotation('G').setVerticalJustification('bottom'))

    //         // const voice = new Voice({})
    //         // Formatter.FormatAndDraw(context, stave,notes)

    //         let test = draw(notes, stave, context, 1 * 25) 

    //         // let test = stave.setContext(context).draw()
    //         let item = test.getSVGElement()
    //         console.log(item)
    //         if (item) {
    //             item?.addEventListener("mouseover", colorDecendants(item, 'green'), false)
    //             item?.addEventListener("mouseout", colorDecendants(item, 'black'), false)
    //         }



    //     }
    //     return () => {renderAfter = true}
    // }, [])
