import React from 'react';
import Die from './Components/Die';
import { nanoid } from 'nanoid';

export default function App(){
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  function generateDice(){    //This variable/helper function holds the die object
    return {
      value: Math.floor(Math.random()*6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){    //generates new dice
    let newDice= [];
    for(let i=0; i<10; i++){
      newDice.push(generateDice());
    }
    return newDice;
  }

  React.useEffect(()=>{
    const allDiceHeld = dice.every(die => die.isHeld);
    const firstDiceValue = dice[0].value;
    const allSameValue = dice.every(die=> die.value === firstDiceValue);
    if(allDiceHeld && allSameValue){
      setTenzies(true)
      alert('You won!')
    }
  },[dice])

  function holdDice(id){  //change the state of die when clicked
    setDice(oldDice => oldDice.map(die =>{
      return die.id===id ?
            {
              ...die,
              isHeld: !die.isHeld
            } :
            die;
    }))
  }

  function rollDice(){
    setDice(oldDice => oldDice.map(die=>{
      return die.isHeld ? die : generateDice();
    }))
  }

  const dieElements = dice.map((die) => {
    return <Die key={die.id}
                value={die.value} 
                isHeld={die.isHeld} 
                holdDice={()=> holdDice(die.id)} 
            />
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