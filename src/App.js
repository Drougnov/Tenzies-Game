import React from 'react';
import Die from './Components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import {Howl} from 'howler';
import winSound from './audio/win.mp3';
import rollSound from './audio/roll.mp3';

export default function App(){
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [audio, setAudio] = React.useState(true);
  const [rollCount, setRollCount] = React.useState(0);

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
      setTenzies(true);
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

  const victory = new Howl({
    src: [winSound]
  })

  if(tenzies){
    audio && victory.play();
  }

  const roll = new Howl({
    src: [rollSound]
  })

  function rollDice(){
    if(!tenzies){
      setDice(oldDice => oldDice.map(die=>{
        audio && roll.play();
        return die.isHeld ? die : generateDice();
      }))
      setRollCount(prevCount => prevCount + 1)
    }else{
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
    }
  }

  function toggleMute(){
    setAudio(prevState => !prevState);
  }

  function startNewGame(){
    setTenzies(false);
    setDice(allNewDice());
  }

  const dieElements = dice.map((die) => {
    return <Die key={die.id}
                value={die.value} 
                isHeld={die.isHeld}
                holdDice={()=> holdDice(die.id)}
            />
  })

  return(
    <div>
      <main className="board">
        <button onClick={toggleMute} className="mute-btn">{audio ? "🔉" : "🔇"}</button>
          <h1>Tenzies</h1>
          <p>Roll untill the dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="die-container">
            {dieElements}
          </div>
          <button onClick={rollDice}>Roll</button>
          {tenzies && <div className="scoreboard">
            <h2>Congratulations!</h2>
            <p className='rollCount'>Rolled: {rollCount}</p>
            <p className="rolltime">Time Taken: 01:00:00</p>
            <h3>Your Score: 4500</h3>
            <button className='close' onClick={startNewGame}>New Game</button>
          </div>}
      </main>
      {tenzies && <Confetti className="confetti" recycle={false} />}
    </div>
  )
}