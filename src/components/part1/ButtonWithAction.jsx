const ButtonWithAction = (props) => {
    return(
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default ButtonWithAction;
