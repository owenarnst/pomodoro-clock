import { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlay, faCirclePause, faRepeat } from "@fortawesome/free-solid-svg-icons";
import '../styles/Timer.css'

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
    const [seconds, updateSeconds] = useState(props.sessionMins * 60 - 1);
    const [isSession, setIsSession] = useState(true);

    //Countdown timer
    useEffect(() => {
        let intervalID;
        if (props.isRunning) {
            document.title = display;
            intervalID = setInterval(() => {
                if (seconds < 0) {
                    document.getElementById("beep").play();
                    if(isSession) {
                        setIsSession(false);
                        updateSeconds(props.breakMins * 60);
                    }
                    else {
                        setIsSession(true);
                        updateSeconds(props.sessionMins * 60);
                    }
                }
                else {
                    updateSeconds(seconds - 1);
                    updateDisplay(formatDisplay(seconds));
                }
            }, 1000);
        }
        return () => clearInterval(intervalID);
    }, [props.isRunning, seconds]);

    //Update length of timer in response to increment, decrement, or reset
    useEffect(() => {
        document.title = "Pomodoro Clock";
        setIsSession(true);
        updateDisplay(formatDisplay(props.sessionMins * 60));
        updateSeconds(props.sessionMins * 60 - 1)
    }, [props.sessionMins, props.restart])

    return (
        <>
            <h2 id="timer-label" className="my-3">{isSession ? "Session" : "Break"}</h2>
            <h1 id="time-left" className="p-3" style={seconds < 59 ? {color: "red", border: "solid red"} : {}} >
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