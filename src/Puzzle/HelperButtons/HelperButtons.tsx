import Button from './Button/Button'

const HelperButtons = () => {
    const handleClickedHelperButton = (content: string) =>
        console.log(`Clicked ${content} Helper Buttons`)
    return (
        <>
            <Button
                className="mx-2 border-1 border-black-200"
                content="Shuffle"
                callbackFunction={() => {
                    handleClickedHelperButton('Shuffle')
                }}
            ></Button>
            <Button
                className="mx-2 border-1 border-black-200"
                content="Deselect All"
                callbackFunction={() => {
                    handleClickedHelperButton('Deselect All')
                }}
            ></Button>
            <Button
                className="mx-2 border-1 border-black-200"
                content="Submit"
                callbackFunction={() => {
                    handleClickedHelperButton('Submit')
                }}
            ></Button>
        </>
    )
}

export default HelperButtons
