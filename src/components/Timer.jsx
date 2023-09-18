//TODO: Implement Web Worker to prevent timer from throttling

import { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay, faCirclePause, faRepeat } from "@fortawesome/free-solid-svg-icons"
import TimerWorker from './timer-worker.js?worker'
import '../styles/Timer.css'

const worker = new TimerWorker();
export function Timer(props) {

    //Format timer output
    const formatDisplay = (secs) => {
        let tempMin = Math.floor(secs / 60);
        let tempSec = secs - (60 * tempMin);
        if (tempMin < 10) {
            tempMin = `0${tempMin}`;
        }
        if (tempSec < 10) {
            tempSec = `0${tempSec}`;
        }
        return `${tempMin}:${tempSec}`;
    }

    const [display, updateDisplay] = useState(formatDisplay(props.sessionMins * 60));
    const [seconds, updateSeconds] = useState(props.sessionMins * 60);
    const [isSession, setIsSession] = useState(true);

    //Countdown timer
    useEffect(() => {

        worker.postMessage({
            isRunning: props.isRunning,
            seconds: seconds-1,
            breakMins: props.breakMins,
            sessionMins: props.sessionMins,
            isSession: isSession
        });
        
        worker.addEventListener('message', (e) => {
            updateDisplay(formatDisplay(e.data.seconds));
            document.title = formatDisplay(e.data.seconds);
            updateSeconds(e.data.seconds);
            if (e.data.seconds === 0) {
                document.getElementById("beep").play();
            }
            setIsSession(e.data.isSession);
        })
        
    }, [props.isRunning]);

    //Update length of timer in response to increment, decrement, or reset
    useEffect(() => {
        document.title = "Pomodoro Clock";
        setIsSession(true);
        updateDisplay(formatDisplay(props.sessionMins * 60));
        updateSeconds(props.sessionMins * 60)
    }, [props.sessionMins, props.restart])

    return (
        <>
            <h2 id="timer-label" className="my-3">{isSession ? "Session" : "Break"}</h2>
            <h1 id="time-left" className="p-3" style={seconds < 60 ? {color: "red", border: "solid red"} : {}} >
                {display}
            </h1>
        </>
    )
}

export function Controls(props) {
    return (
        <div className="my-3">
            <button id="start_stop" className="mx-2 control-button" onClick={props.handleStartStop}>
                {props.isRunning ? <FontAwesomeIcon icon={faCirclePause} /> : <FontAwesomeIcon icon={faCirclePlay} />}
            </button>
            <button id="reset" className="control-button" onClick={props.handleRestart}><FontAwesomeIcon icon={faRepeat} /></button>
        </div>
    )
}