import { useState, useEffect } from "react"
import axios from "axios"

const PrintNote = ({note}) => {
    return(
        <li>
            {note.id} - {note.content} - {note.important ? "True" : "False"}
        </li>
    )
}

const Notes =() => {
    const [notes, setNotes] = useState([])
    const [newNote, SetNewNote] = useState('a new note');
    const [showAll, setShowAll] = useState(true);

    const hook = () => {
        console.log('effect')
        axios.get("http://localhost:3001/notes").then( response => {
            console.log("Promise Fulfilled")
            setNotes(response.data)
        })
    }

    useEffect(hook, [])

    console.log("render", notes.length, "notes")
    const addNote = (event) => {
        event.preventDefault() //Prevent the page from reloading by
        console.log("Button Clicked")
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length +1)
        }

        setNotes(notes.concat(noteObject))
        SetNewNote("")
    }

    const handleNoteChange =(event) => {
        console.log(event.target.value)
        SetNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important == true)


    return(
        <div>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "all" : "filtered"}
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <PrintNote key={note.id} note={note}/>)
                }
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default Notes