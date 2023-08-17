import React from 'react'
import Die from '../components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    function generateSingleNewDice() {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    const generateAllNewDice = () => {
        let randomArray = []
        for (let i = 1; i < 11; i++) {
            randomArray.push(generateSingleNewDice())
        }
        return randomArray
    }


    const [dice, setDice] = React.useState(generateAllNewDice())
    const [tenzies, setTenzies] = React.useState(false)


    React.useEffect(function(){
        const allHeldTrue = dice.every((die)=>die.isHeld)
        const allDiceSame = dice.every((die)=> die.value === dice[0].value)

        if (allDiceSame && allHeldTrue){
            setTenzies(true)
        }

    },[dice])



    const diceElements = dice.map((dice) => {
        return <Die
            key={dice.id}
            value={dice.value}
            isHeld={dice.isHeld}
            hold={() => hold(dice.id)}
        />
    })

    function hold(id) {
        setDice(oldDice => oldDice.map((dice) => {
            if (dice.id === id) {
                return {
                    ...dice,
                    isHeld: !dice.isHeld
                }
            }
            return dice
        }))
    }

    function handleRollClick() {
        if(!tenzies){
            setDice(oldDice => {
                return oldDice.map(dice => {
                    return dice.isHeld ? dice : generateSingleNewDice()
                })
            })
        }
        else{
            setTenzies(false)
            setDice(generateAllNewDice())
        }
    }

    return (
        <>
            <main className='main-box'>
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="container">
                    {diceElements}
                </div>
                <button id='roll-btn' onClick={handleRollClick}>{tenzies?'New Game':'Roll'}</button>
                {tenzies && <p id='winner'>You have won the game</p>}
                {tenzies && <Confetti />}
            </main>
        </>
    )
}


