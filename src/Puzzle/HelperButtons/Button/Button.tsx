const Button = ({
    className,
    content,
}: {
    className: string
    content: string
}) => {
    return (
        <>
            <div
                className={`border-1 rounded-full px-5 py-3 border-black-200 ${className}`}
            >
                <p>{content}</p>
            </div>
        </>
    )
}

export default Button
