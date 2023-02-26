'use client'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../../styles/globals.css'
import {notes} from '../../components/globals/globals'
import Link from 'next/link'
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
    const [answer, setAnswer] = useState('g/4') //initial 

    const userAns = {note: '', octave: ''}

    //Without this, would cause randomization not to work and cause santization errors
    useEffect(()=> {
        setAnswer(addRandomSingleNote(4,5))
    },[])

    useEffect(() => {
            if (currentQuestion < totalQuestions) {
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
            }

    }, [currentQuestion, answer])

    function isUserCorrect() {
        if (userAns.note !== '' && userAns.octave !== '') setHasAnswered(true)

        if ((userAns.note + '/' + userAns.octave) === answer) setIsCorrect(true)
    }

    function nextQuestion() {
        if (!isCorrect) {
            setIsCorrect(false)
            setHasAnswered(false)
            setAnswer(addRandomSingleNote(4,5))
        } else{
            setCurrentQuestion((currentQuestion) => currentQuestion + 1)
            setIsCorrect(false)
            setHasAnswered(false)
            setAnswer(addRandomSingleNote(4,5))
        }
    }

    return (
        <div className="border-4 border-solid border-red-700 h-screen p-auto">
            {currentQuestion === 10? 
                <>
                    <div className='text-center'>
                        <h3 className='text-3xl'>GOOD JOB</h3>
                        <Link href='/'>
                            <button>CONTINUE</button>
                        </Link>
                    </div>
                </> : 
                <>
                    <div className='border-4 border-solid border-black text-4xl'> 
                        <Link href='/'>
                            <button>X</button>
                        </Link>
                    </div>
                    <div className="border-4 border-solid border-orange-600 text-center text-4xl"> Question {currentQuestion}</div>
                    <div id="output" className="grid place-items-center border-4 border-solid border-blue-700"></div>  {/* output is the SVG image to include */}
                    <div className='grid place-items-center border-4 border-solid border-gray-700 text-3xl p-3'>Identify the note and octave.</div> 
                    <div className='border-4 border-solid border-green-700 p-1 flex justify-center flex-wrap gap-10'>
                        <div className={`border-4 border-solid border-green-700 p-1 flex-col flex-wrap w-96 ${ hasAnswered ? 'pointer-events-none': ''}`}>
                            <ButtonGroup
                                onChange={(index) => {
                                    userAns.note = notes[index]
                                    console.log(userAns)
                                }}
                                labelText={'Notes'}
                                options={notes.map(val => val.toUpperCase())} 
                                hasAnswered={hasAnswered}
                                />                
                        </div>
                        <div className={`border-4 border-solid border-purple-400 p-1 flex-col flex-wrap w-96 ${ hasAnswered ? 'pointer-events-none' : ''}`}>
                            <ButtonGroup
                                onChange={(index) => {
                                    userAns.octave = String(index+1)
                                    console.log(userAns)
                                }}
                                labelText={'Notes'}
                                options={['1', '2', '3', '4', '5', '6', '7']} 
                                hasAnswered={hasAnswered}
                                />                
                        </div>
                    </div>
                    <div className={`border-4 border-solid border-purple-700 flex justify-center text-3xl ${!hasAnswered ? '' : 'hidden'}`}> 
                        <button className='flex' onClick={() => isUserCorrect()} tabIndex={-1}>Check</button>
                    </div>
                    <div className={`border-4 border-solid border-purple-700 ${hasAnswered ? '' : 'hidden'}`}>
                            { isCorrect ? 
                                <div className='bg-green-600 flex justify-center text-3xl gap-10'>
                                    <h3 className='bg-green-600'>Correct!</h3>
                                    <button className='' onClick={() => nextQuestion()} tabIndex={-1}> Continue </button>
                                </div> : 
                                <div className='bg-red-700 flex justify-center text-3xl gap-10'>
                                    <h3> Incorrect :&#40; Answer: {answer}</h3>
                                    <button className='' onClick={() => nextQuestion()} tabIndex={-1}> Continue </button>
                                </div>
                            }
                    </div>
                </>}
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
