'use client'
import React, { useEffect, useState } from 'react'
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
    const [windowSize, setWindowSize] = useState([ typeof window !== 'undefined' ? window.innerWidth : 0, 
                                                   typeof window !== 'undefined' ? window.innerHeight : 0])
    const [isCorrect, setIsCorrect] = useState(false)
    const [hasAnswered, setHasAnswered] = useState(false)
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const [answer, setAnswer] = useState('g/4') //initial 

    const userAns = {note: '', octave: ''}


    useEffect(() => {
        function handleWindowResize() {
            setWindowSize([window.innerWidth, window.innerHeight])
        }
        window.addEventListener('resize', handleWindowResize)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    //Without this, would cause randomization not to work and cause santization errors
    useEffect(()=> {
        setAnswer(addRandomSingleNote(4,5))
    },[])

    useEffect(() => {
            if (currentQuestion < totalQuestions) {
                document.getElementById('output')?.replaceChildren();
                let sizeW = 0 
                let sizeH = 0
                let scale = 0
                if (windowSize[0] > 1920 && windowSize[0] > 1000) {
                    sizeW = 404
                    sizeH = 400
                    scale = 4
                } else if (windowSize[0] < 700) {
                    sizeW = 204
                    sizeH = 200
                    scale = 2
                } else {
                    sizeW = 304
                    sizeH = 300
                    scale = 3
                }
                const renderer = new Renderer("output", Renderer.Backends.SVG)
                renderer.resize(sizeW, sizeH)
                //340, 350 scale: 3
                //253, 250 scale: 2.5
                const context = renderer.getContext()
                context.scale(scale, scale)
                const stave = new Stave(0,0, 100)
                stave.addClef("treble").setContext(context).draw()
                
                console.log(answer)
                let notesToStave = new StaveNote({keys: [answer], duration: 'w'})

                let finalize = draw(notesToStave, stave, context, 1*15)
            }
    }, [currentQuestion, answer, windowSize])

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
        <div className="grid border-4 border-solid border-red-700 h-screen">
            {currentQuestion === totalQuestions ? 
                <>
                    <div className='flex flex-col justify-center items-center border-4 border-solid border-orange-900 h-screen'>
                        <div className='flex flex-col justify-center border-4 border-solid border-black w-fit'>
                            <h3 className='border-solid border-4 border-yellow-400 text-3xl text-center font-extrabold'>GOOD JOB</h3>
                            <Link href='/' className=' border-solid border-4 border-orange-400 text-xl text-center'>
                                <button className='font-extrabold'>CONTINUE</button>
                            </Link>
                        </div>
                    </div>
                </> : 
                <>
                    <div className="flex border-4 border-solid border-orange-600"> 
                        <Link href='/' className='flex items-center justify-center'>
                            <button className='font-extrabold text-2xl text-center'>X</button>
                        </Link>
                        <h3 className='m-auto text-center text-4xl font-semibold'>Question {currentQuestion}</h3>
                    </div>
                    <div id="output" className="flex justify-center border-4 border-solid border-blue-700"></div>  {/* output is the SVG image to include */}
                    <div className='flex justify-center items-center border-4 border-solid border-gray-700 text-4xl font-semibold'>Identify the note and octave.</div> 
                    <div className='border-4 border-solid border-green-700 p-1 flex flex-row justify-center items-center flex-wrap gap-10'>
                        <div className={`border-4 border-solid border-green-700 flex-wrap w-96 ${ hasAnswered ? 'pointer-events-none': ''}`}>
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
                        <div className={`border-4 border-solid border-purple-400 flex-wrap w-96 ${ hasAnswered ? 'pointer-events-none' : ''}`}>
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
                    <div className={`border-4 border-solid border-purple-700 flex justify-center item-center text-3xl row-span-3 ${!hasAnswered ? '' : 'hidden'}`}> 
                        <button className='font-bold' onClick={() => isUserCorrect()} tabIndex={-1}>Check</button>
                    </div>
                    <div className={`border-4 border-solid border-purple-700 row-span-3 ${hasAnswered ? '' : 'hidden'}`}>
                            { isCorrect ? 
                                <div className='bg-green-600 flex justify-center items-center text-3xl gap-10 h-full'>
                                    <h3 className='bg-green-600'>Correct!</h3>
                                    <button className='' onClick={() => nextQuestion()} tabIndex={-1}> Continue </button>
                                </div> : 
                                <div className='bg-red-700 flex justify-center items-center text-3xl gap-10 h-full'>
                                    <h3 className='bg-red-700'> Incorrect :&#40; Answer: {answer.replace('/', '').toUpperCase()}</h3>
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