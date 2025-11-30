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



const LeftAndRightClicks = () => {
    const [clicks, setClicks] = useState({left:0,right:0})
    /**
     *  @param {string} side
     */

    const handleClick=(side)=> {
        setClicks(prevState => ({
            ...prevState,
            [side]: prevState[side]+1
        }))
    }

    return (
        <div>
            <span>{clicks.left}</span>
            <button onClick={() => handleClick("left")}>Left</button>
            <button onClick={() => handleClick("right")}>Right</button>
            <span>{clicks.right}</span>
            <p>Hello</p>
        </div>
    )
}


const Calculator = () => {
    const [exp, setExp] = useState("");
    const [valid, setValid] = useState(true);
    const [result, setResult] = useState("0");
    const regEx = /[+/-]{2,}/;
    /**
     *  @param {string} char
     */
    const onClickConcat = (char) => {
        const newExp = exp.concat(char);
        setExp(newExp);
        if(regEx.test(newExp)) setValid(false);
        else setValid(true)
        console.log(exp);
    }

    const onClickDelete = () => {
        setExp(exp.slice(0, -1));
    }

    const onClickClear = () => {
        setExp("");
        setResult("0");
    }

    const onClickEqual = () => {
        if (!valid) return;
        const result = computeExpression(exp);
        setResult(String(result));
    }

    const computeExpression = (exp)=> {
        if (!exp) return("")
        const tokens = exp.match(/[+-]|\d+/g);
        if (!tokens) return("")

        let total = Number(tokens[0])

        for (let i = 1; i < tokens.length; i+=2) {
            const op = tokens[i];
            const value = Number(tokens[i+1]);

            if (Number.isNaN(value)) return("NaN")

            if (op === "+") total += value;
            else if (op === "-") total -= value;
        }
        return total;
    }

    return(
        <div>
            <p>{exp}</p>
            <p>{result}</p>
            <div>
                <button onClick={() => onClickConcat("1")}>1</button>
                <button onClick={() => onClickConcat("2")}>2</button>
                <button onClick={() => onClickConcat("3")}>3</button>
            </div>
            <div>
                <button onClick={() => onClickConcat("4")}>4</button>
                <button onClick={() => onClickConcat("5")}>5</button>
                <button onClick={() => onClickConcat("6")}>6</button>
            </div>
            <div>
                <button onClick={() => onClickConcat("7")}>7</button>
                <button onClick={() => onClickConcat("8")}>8</button>
                <button onClick={() => onClickConcat("9")}>9</button>
            </div>
            <div>
                <button onClick={() => onClickConcat("0")}>0</button>
                <button onClick={() => onClickConcat("+")}>+</button>
                <button onClick={() => onClickConcat("-")}>-</button>
            </div>
            <div>
                <button onClick={() => onClickDelete()}>del</button>
                <button onClick={() => onClickClear()}>clr</button>
            </div>
            <div>
                <button onClick={()=>onClickEqual()}>=</button>
            </div>
            <p>{valid?"Valid":"Not Valid"}</p>
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
        <p></p>
        <LeftAndRightClicks/>
        <p></p>
        <Calculator/>
    </>
  )
}

export default App
