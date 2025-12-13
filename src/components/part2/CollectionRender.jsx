const CollectionRender = ({notes}) => {
    return(
        <>
            <h3>Notes</h3>
            <ul>
                <li>{notes[0].content}</li>
                <li>{notes[1].content}</li>
                <li>{notes[2].content}</li>
            </ul>
        </>
    )
}

export default CollectionRender