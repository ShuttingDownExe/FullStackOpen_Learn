import {useEffect, useState} from "react";

const DisplayBasicText = (props) => {
    return(
        <p>{props.text}</p>
    )
}

const DisplayHeader = (props) => {
    return(
        <h1>{props.text}</h1>
    )
}

const ButtonWithAction = (props) => {
    return(
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const ManualCounter = () => {
    const [count, setCount] = useState(0);
    const incrementCount = () => {
        setCount(count+1);
        console.log(count);
    }
    const  decrementCount = () => {
        setCount(count-1)
        console.log(count)
    }
    return(
        <div>
            <p>{count}</p>
            <ButtonWithAction text={"+"} onClick={incrementCount}/>
            <ButtonWithAction text={"-"} onClick={decrementCount}/>
        </div>
    )
}

const TimedCounter =() => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setCount((c) => c+1);
        }, 1000);
        return () => clearInterval(id);
    }, []);
    return(
        <p>{count}</p>
    )
}

const RegExMatch = () => {
    const [match, setMatch] = useState(false)
    const RegEx = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")

    return(
        <div>
            <input id={"matchInput"} onChange={
                (event) => {
                    setMatch(RegEx.test(event.target.value))
                }
            }/>
            <button disabled={!match}>{match?"Valid":"Invalid"}</button>
        </div>
    )
}

const App = () => {
  return (
    <>
        <DisplayHeader text={"Full Stack Open Course"}/>
        <DisplayBasicText text={"Hello There"}/>
        <ManualCounter/>
        <TimedCounter/>
        <RegExMatch/>
    </>
  )
}

export default App
