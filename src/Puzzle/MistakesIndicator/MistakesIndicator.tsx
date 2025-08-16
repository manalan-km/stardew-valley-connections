import './MistakesIndicator.css'

const MistakesIndicator = ({
    numberOfMistakesLeft,
}: {
    numberOfMistakesLeft: number
}) => {
    return (
        <>
            <div className="description my-3">
                <span>
                    Mistakes Remaining:
                    {Array.from({ length: numberOfMistakesLeft }, (_, i) => (
                        <span key={i} className="bubble mx-0.5"></span>
                    ))}
                </span>
            </div>
        </>
    )
}

export default MistakesIndicator
