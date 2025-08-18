import { useState } from 'react'
import type { Category, Data, Item } from '../utils/models/Data'
import Cell from './Board/Board'
import HelperButtons from './HelperButtons/HelperButtons'
import MistakesIndicator from './MistakesIndicator/MistakesIndicator'
import './Puzzle.css'

import { format } from 'date-fns'

const Puzzle = () => {
    const current_date = new Date()
    const month_and_date = format(current_date, 'MMMM dd')
    const year = format(current_date, 'yyyy')

    const [mistakesLeft, setMistakesLeft] = useState<number>(4)
    const [selectedCells, setSelectedCells] = useState<string[]>([])

    const data: Data = {
        categories: [
            {
                category: 'Monster Loot',
                items: [
                    { item: 'Slime', position: 7 },
                    { item: 'Void Essence', position: 12 },
                    { item: 'Bug Meat', position: 3 },
                    { item: 'Solar Essence', position: 15 },
                ],
            },
            {
                category: 'Mushrooms',
                items: [
                    { item: 'Chanterelle', position: 9 },
                    { item: 'Morel', position: 1 },
                    { item: 'Magma Cap', position: 14 },
                    { item: 'Purple Mushroom', position: 6 },
                ],
            },
            {
                category: 'Vegetables',
                items: [
                    { item: 'Cauliflower', position: 11 },
                    { item: 'Wheat', position: 4 },
                    { item: 'Kale', position: 16 },
                    { item: 'Bradish', position: 8 },
                ],
            },
            {
                category: 'Fall seeds',
                items: [
                    { item: 'Broccoli Seeds', position: 2 },
                    { item: 'Cranberry Seeds', position: 13 },
                    { item: 'Corn Seeds', position: 10 },
                    { item: 'Artichoke Seeds', position: 5 },
                ],
            },
        ],
    }

    const clickCallbackFunction = (item: Item) => {
        console.log(`Clicked ${item.item}`)
        const itemName = item.item.toUpperCase()

        setSelectedCells((prev) => {
            if (prev.includes(itemName)) {
                return prev.filter((cell) => cell !== itemName)
            } else {
                if (prev.length < 4) {
                    return [...prev, itemName]
                }
                return prev
            }
        })
    }

    return (
        <>
            <div className="mx-20 my-10 ">
                <span className="libre-franklin-thin">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
            <div className="description flex justify-center my-4">
                Create four groups of four!
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-4 grid-rows-4">
                    {data.categories
                        .flatMap((category: Category) => category.items)
                        .sort((a, b) => a.position - b.position)
                        .map((item: Item) => (
                            <Cell
                                key={item.position}
                                content={item.item.toUpperCase()}
                                isSelected={selectedCells.includes(
                                    item.item.toUpperCase()
                                )}
                                clickCallbackFunction={() => {
                                    clickCallbackFunction(item)
                                }}
                                cellDisabled={
                                    !selectedCells.includes(
                                        item.item.toUpperCase()
                                    ) && selectedCells.length == 4
                                }
                            />
                        ))}
                </div>
            </div>
            <div className="flex justify-center">
                <MistakesIndicator
                    numberOfMistakesLeft={mistakesLeft}
                ></MistakesIndicator>
            </div>
            <div className="flex justify-center">
                <HelperButtons></HelperButtons>
            </div>
        </>
    )
}

export default Puzzle
