import {useState} from "react";

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

export default LeftAndRightClicks;
