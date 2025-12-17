import {Link} from "react-router-dom";
import Notes from "./Notes.jsx";

export default function part2(){
    return(
        <>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
            <Notes/>
        </>
    );
}