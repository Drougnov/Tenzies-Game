import React from 'react';
import Die from './Components/Die';
import { nanoid } from 'nanoid';

export default function App(){
  function allNewDice(){
    let newDice= [];
    for(let i=0; i<10; i++){
      newDice.push(
          {
            value: Math.floor(Math.random()*6) + 1,
            isHeld: false,
            id: nanoid()
          }
        )
    }
    return newDice;
  }

  const [dice, setDice] = React.useState(allNewDice())

  function rollDice(){
    setDice(allNewDice())
  }

  const dieElements = dice.map((die) => {
    return <Die key={die.id} value={die.value} />
  })

  return(
    <main className="board">
        <h1>Tenzies</h1>
        <p>Roll untill the dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="die-container">
          {dieElements}
        </div>
        <button onClick={rollDice}>Roll</button>
    </main>
  )
}