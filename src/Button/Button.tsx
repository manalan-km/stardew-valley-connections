import Skeleton from '../Skeleton/Skeleton'

const ButtonContent = ({
    content,
    contentClassName,
}: {
    content: string
    contentClassName: string
}) => {
    return (
        <>
            <span className={contentClassName}>{content}</span>
        </>
    )
}

const Button = ({
    id,
    className,
    content,
    contentClassName,
    callbackFunction,
    disabled = false,
    loading = false,
    skeletonColor = '#d1d5db',
}: {
    id: string
    className: string
    content: string
    contentClassName: string
    callbackFunction: () => void
    disabled?: boolean
    loading?: boolean
    skeletonColor?: string
}) => {
    if (loading) {
        return (
            <Skeleton className={className} color={skeletonColor}>
                <ButtonContent
                    content={content}
                    contentClassName={contentClassName}
                />
            </Skeleton>
        )
    }

    return (
        <button
            id={id}
            onClick={callbackFunction}
            type="button"
            className={`${className} ${disabled ? '' : 'cursor-pointer'}`}
            disabled={disabled}
        >
            <ButtonContent
                content={content}
                contentClassName={contentClassName}
            />
        </button>
    )
}

export default Button
