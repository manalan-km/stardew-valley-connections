const Button = ({
    className,
    content,
    contentClassName,
    callbackFunction,
    disabled = false,
}: {
    className: string
    content: string
    contentClassName: string
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callbackFunction: Function
    disabled?: boolean
}) => {
    return (
        <>
            <button
                onClick={() => {
                    callbackFunction()
                }}
                type="button"
                className={`${className}  ${disabled ? '' : 'cursor-pointer'}`}
                disabled={disabled}
            >
                <span className={`${contentClassName}`}>{content}</span>
            </button>
        </>
    )
}

export default Button
