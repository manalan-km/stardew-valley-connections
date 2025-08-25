import Button from './Button/Button'

const HelperButtons = ({
    disableDeselectAllButton = false,
    disableSubmitButton = true,
}: {
    disableDeselectAllButton?: boolean
    disableSubmitButton?: boolean
}) => {
    return (
        <>
            <Button
                className="mx-2 border-1 border-black-200 disabled:opacity-25"
                content="Shuffle"
                callbackFunction={() => {
                }}
            ></Button>
            <Button
                className="mx-2 border-1 border-black-200 disabled:opacity-25"
                content="Deselect All"
                callbackFunction={() => {
                }}
                disabled={disableDeselectAllButton}
            ></Button>
            <Button
                className="mx-2 border-1 border-black-200 disabled:opacity-25"
                content="Submit"
                callbackFunction={() => {
                }}
                disabled={disableSubmitButton}
            ></Button>
        </>
    )
}

export default HelperButtons
