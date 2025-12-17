import CollectionRender from "./CollectionRender.jsx";
import {useState} from "react";

/**
 * @typedef {Object} Note
 * @property {number|string} id
 * @property {string} content
 * @property {boolean} [important]
 */

const Notes = () => {
    const [notes, setNotes] = useState(
        [
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
    )

    const addNote = (event) => {
        event.preventDefault();
        console.log("button clicked",event.target)
    }

    return (
        <>
            <CollectionRender notes={notes}/>
            <form onSubmit={addNote}>
                <input/>
                <button type="submit">save</button>
            </form>
        </>
    )
}

export default Notes