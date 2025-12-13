import {useState} from "react";

const ReturningFunctions = () => {
    const [value, setValue] = useState(0);
    const setToValue = (value) => () => {
        console.log(`Setting value to ${value}`);
        setValue(value);
    }



    return(
        <>
            <p>{value}</p>
        <button onClick={setToValue(500)}>Click Me</button>
        <button onClick={setToValue(300)}>Click Me</button>
        <button onClick={setToValue(value+1)}>Click Me</button>
        </>
    )
}

export default ReturningFunctions;
