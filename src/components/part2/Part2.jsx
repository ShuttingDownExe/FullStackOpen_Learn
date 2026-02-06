import {Link} from "react-router-dom";
import HigherOrderFunctions from "./HigherOrderFunctions.jsx";
import Notes from "./notes.jsx";

export default function part2(){
    const notes = [
        {
            id: 1,
            content: 'HTML is easy',
            important: true
        },
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false
        },
        {
            id: 3,
            content: 'GET and POST are the most important methods of ' +
                'HTTP protocol',
            important: true
        }
    ]

    return(
        <>
            <Link to="/">
                <button>← Back to Home</button>
            </Link>

            <HigherOrderFunctions/>
            <Notes notes={notes}/>
            <Link to={"/Axios"}>
                <button>Axios</button>
            </Link>
        </>
    );
}