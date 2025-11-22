export const EVENTS = {
    PLAY_CLICKED: 'playClicked'
}

const playClickedEvent = new Event(EVENTS.PLAY_CLICKED)

export const emitPlayClicked = () => {
    document.dispatchEvent(  playClickedEvent )
}