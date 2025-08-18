import Button from './Button/Button'

const HelperButtons = ({
    disableDeselectAllButton = false,
    disableSubmitButton = true,
}: {
    disableDeselectAllButton?: boolean
    disableSubmitButton?: boolean
}) => {
    const handleClickedHelperButton = (content: string) =>
        console.log(`Clicked ${content} Helper Buttons`)
    return (
        <>
            <Button
                className="mx-2 border-1 border-black-200 disabled:opacity-25"
                content="Shuffle"
                callbackFunction={() => {
                    handleClickedHelperButton('Shuffle')
                }}
            ></Button>
            <Button
                className="mx-2 border-1 border-black-200 disabled:opacity-25"
                content="Deselect All"
                callbackFunction={() => {
                    handleClickedHelperButton('Deselect All')
                }}
                disabled={disableDeselectAllButton}
            ></Button>
            <Button
                className="mx-2 border-1 border-black-200 disabled:opacity-25"
                content="Submit"
                callbackFunction={() => {
                    handleClickedHelperButton('Submit')
                }}
                disabled={disableSubmitButton}
            ></Button>
        </>
    )
}

export default HelperButtons
