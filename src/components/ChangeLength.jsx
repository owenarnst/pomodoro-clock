import '../styles/ChangeLength.css'

export function DecrementButton(props) {
    return (
      <button id={props.id} className="change" onClick={props.decreaseTime} disabled={props.isRunning} >
        -
      </button>
    )
}
  
export function IncrementButton (props) {
    return (
      <button id={props.id} className="change" onClick={props.increaseTime} disabled={props.isRunning} >
        +
      </button>
    )
}
