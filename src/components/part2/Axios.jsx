import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Axios = () => {
    const [response, setResponse] = useState("")

    const handleGetJSON = () => {
        const promise = axios.get("http://localhost:3001/notes")
        console.log(promise)

        promise.then(res => {
            setResponse(JSON.stringify(res.data, null, 2))
        })
    }
    
    return (
        <>
        <Link to={"/"}>
            <button>← Back to Home</button>
        </Link>
        <h1> Axios</h1>
        <h3>Check Console</h3>
        <button onClick={handleGetJSON}>
            Get JSON
        </button>
        <pre>
            <code>
                {response}
            </code>
        </pre>

        </>
    )
}

export default Axios