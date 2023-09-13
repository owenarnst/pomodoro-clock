import { DecrementButton, IncrementButton } from "./ChangeLength"
import '../styles/BreakAndSession.css'

export function Break(props) {
    return (
        <div id="break-component">
            <h2 id="break-label">Break Length</h2>
            <div className="length-display my-2">
                <DecrementButton id="break-decrement" decreaseTime={props.handleDecrement} isRunning={props.isRunning} />
                <h3 id="break-length" className="mx-3">{props.breakLength}</h3>
                <IncrementButton id="break-increment" increaseTime={props.handleIncrement} isRunning={props.isRunning} />
            </div>
        </div> 
    )
}

export function Session(props) {
    return (
        <div id="session-component">
            <h2 id="session-label">Session Length</h2>
            <div className="length-display">
                <DecrementButton id="session-decrement" decreaseTime={props.handleDecrement} isRunning={props.isRunning} />
                <h3 id="session-length" className="mx-3">{props.sessionLength}</h3>
                <IncrementButton id="session-increment" increaseTime={props.handleIncrement} isRunning={props.isRunning} />
            </div>
        </div> 
    )
}