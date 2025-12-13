import {useEffect, useState} from "react";

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

export default TimedCounter;
