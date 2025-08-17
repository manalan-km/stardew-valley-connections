const Button = ({
    className,
    content,
    callbackFunction,
}: {
    className: string
    content: string
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callbackFunction: Function
}) => {
    return (
        <>
            <button
                onClick={() => {
                    callbackFunction()
                }}
                type="button"
                className={`p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base  rounded-full px-5 py-3  hover:cursor-pointer ${className}`}
            >
                {content}
            </button>
        </>
    )
}

export default Button
