import {useState} from "react";

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

export default RegExMatch;
