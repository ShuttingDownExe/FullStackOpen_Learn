import {useState} from "react";

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
            <div>
                <p>{exp}</p>
            </div>
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

export default Calculator;
