import { useState } from "react"

const PrintNote = ({note}) => {
    return(
        <li>
            {note.content}
        </li>
    )
}

const Notes =(props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, SetNewNote] = useState('a new note');

    const addNote = (event) => {
        event.preventDefault() //Prevent the page from reloading by
        console.log("Button Clicked")
    }

    const handleNoteChange =(event) => {
        console.log(event.target.value)
        SetNewNote(event.target.value)
    }
    return(
        <div>
            <ul>
                {notes.map(note =>
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