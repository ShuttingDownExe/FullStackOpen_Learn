import {Link} from "react-router-dom";
import CollectionRender from "./CollectionRender.jsx";

export default function part2(){
    const notes = [
        {
            id: 1,
            content: 'HTML is easy',
            important: true}
        ,
        {
            id: 2,
            content: 'Browser can execute only JavaScript',
            important: false
        },
        {
            id: 3,
            content: 'GET and POST are the most important methods of HTTP protocol',
            important: true
        }
    ]
    return(
        <>
            <Link to="/">
                <button>Back to Home</button>
            </Link>
            <CollectionRender notes={notes}></CollectionRender>
        </>
    );
}