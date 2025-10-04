import type { SolvedCategory } from '../../utils/models/Data'
import { useEffect } from 'react'
import { AnimationSequencer } from '../../utils/AnimationSequencer'

const SolvedItems = ({
    solvedCategories,
}: {
    solvedCategories: SolvedCategory[]
}) => {
    const animationSequencer = new AnimationSequencer()

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7ca18']

    const getColorByOrder = (solvedOrder: number) => {
        return colors[solvedOrder - 1] || '#95a5a6' // solvedOrder starts at 1
    }

    const animateDiv = () => {
        const solvedCategoryDivs = document.querySelectorAll('.solvedCategory')

        if (solvedCategoryDivs.length === 0) {
            return
        }

        const elementToAnimate =
            solvedCategoryDivs[solvedCategoryDivs.length - 1]

        animationSequencer.add({
            targets: elementToAnimate,
            animeParams: {
                scale: [1, 1.1, 1],
                duration: 400,
            },
        })
    }
    useEffect(() => {
        animateDiv()
    }, [])

    return (
        <div className="flex justify-center mb-2 mx-2">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
                {solvedCategories
                    .sort((a, b) => a.solvedOrder - b.solvedOrder)
                    .map((solvedCat) => (
                        <div
                            key={solvedCat.category}
                            className="mb-2 p-4 rounded solvedCategory"
                            style={{
                                backgroundColor: getColorByOrder(
                                    solvedCat.solvedOrder
                                ),
                            }}
                        >
                            <div className="text-center font-bold text-black text-lg mb-2 category-content">
                                {solvedCat.category.toUpperCase()}
                            </div>
                            <div className="text-center text-black text-sm content">
                                {solvedCat.items
                                    .map((item) => item.item.toUpperCase())
                                    .join(' • ')}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default SolvedItems
