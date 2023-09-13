import { useState } from 'react'
import { Break, Session } from './components/BreakAndSession'
import { Timer, Controls } from './components/Timer'

function App() {

  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [reset, setReset] = useState(false);

  //Decrease break or session length
  const handleDecrement = (event) => {
    if(event.target.id.indexOf("break") > -1) {
      setBreakTime(Math.max(1, breakTime - 1));
    }
    else {
      setSessionTime(Math.max(1,sessionTime - 1));
    }
  }

  //Increase break or session length
  const handleIncrement = (event) => {
    if(event.target.id.indexOf("break") > -1) {
      setBreakTime(Math.min(60, breakTime + 1));
    }
    else {
      setSessionTime(Math.min(60, sessionTime + 1));
    }
  }

  //Play, pause, or restart timer
  const handleStartStop = () => {
      setIsRunning(!isRunning);
  }

  const handleRestart = () => {
      document.getElementById("beep").pause();
      document.getElementById("beep").currentTime = 0;
      setBreakTime(5);
      setSessionTime(25);
      setIsRunning(false);
      setReset(!reset);
  }

  return (
    <main className="container text-center">
      <div className="row row-cols-1 my-5">
        <div className="col">
          <Timer isRunning={isRunning} sessionMins={sessionTime} breakMins={breakTime} restart={reset} />
        </div>
        <div className="col">
          <Controls isRunning={isRunning} handleStartStop={handleStartStop} handleRestart={handleRestart} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Break breakLength={breakTime} handleDecrement={handleDecrement} handleIncrement={handleIncrement} isRunning={isRunning} />
        </div>
        <div className="col">
          <Session sessionLength={sessionTime} handleDecrement={handleDecrement} handleIncrement={handleIncrement} isRunning={isRunning} />
        </div>
      </div>
    </main>
  )
}

export default App
