const Button = (props) => (
    <button onClick = {props.handleClick}>
        {props.buttonLabel}
    </button>
)

export default Button