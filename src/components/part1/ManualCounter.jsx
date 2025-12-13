import {useState} from "react";
import ButtonWithAction from "./ButtonWithAction.jsx";

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

export default ManualCounter;
