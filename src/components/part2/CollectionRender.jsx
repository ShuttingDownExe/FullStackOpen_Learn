/**
 * @typedef {Object} Note
 * @property {number|string} id
 * @property {string} content
 * @property {boolean} [important]
 */

const Note = ({note}) => {
    return(
        <li>
            {note.content}
        </li>
    )
}
/**
 * @param {{ notes: Array<Note>}}
 */
const CollectionRender = ({notes}) => {
    return(
        <>
            <h3>Notes</h3>
            <ul>
                {notes.map(note =>
                    <Note key={note.id} note={note}/>
                )}
            </ul>
        </>
    )
}

export default CollectionRender