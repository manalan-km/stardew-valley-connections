import { useEffect, useRef, useState } from 'react'
import './MistakesIndicator.css'
import { AnimationSequencer } from '../../utils/AnimationSequencer'

const animationSequencer =
    AnimationSequencer.instance || new AnimationSequencer()

const MistakesIndicator = ({
    numberOfMistakesLeft,
}: {
    numberOfMistakesLeft: number
}) => {
    const prevMistakesRef = useRef(numberOfMistakesLeft)
    const [displayCount, setDisplayCount] = useState(numberOfMistakesLeft)

    useEffect(() => {
        // Only animate if mistakes decreased (user made a mistake)
        if (numberOfMistakesLeft < prevMistakesRef.current) {
            const elements = document.querySelectorAll('.bubble')
            console.log('Number of bubbles: ', elements.length)

            if (elements.length > 0) {
                const lastBubbleElement = elements[elements.length - 1]
                console.log('Last Bubble Element: ', lastBubbleElement)
                animationSequencer.add({
                    targets: lastBubbleElement,
                    animeParams: {
                        scale: [1, 1.8, 0],
                        opacity: [1, 1, 0],
                        duration: 700,
                        delay: 300,
                        easing: 'easeInOutQuad',
                        onComplete: () => {
                            setDisplayCount(numberOfMistakesLeft)
                        },
                    },
                })
            }
        } else {
            setDisplayCount(numberOfMistakesLeft)
        }

        prevMistakesRef.current = numberOfMistakesLeft
    }, [numberOfMistakesLeft])

    return (
        <>
            <div className="description my-3">
                <span>
                    Mistakes Remaining:
                    {Array.from({ length: displayCount }, (_, i) => (
                        <span key={i} className="bubble mx-0.5"></span>
                    ))}
                </span>
            </div>
        </>
    )
}

export default MistakesIndicator
