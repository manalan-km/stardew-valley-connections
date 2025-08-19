import { useState } from 'react'
import type { Category, Data, ICell } from '../utils/models/Data'
import Cell from './Board/Board'
import MistakesIndicator from './MistakesIndicator/MistakesIndicator'
import './Puzzle.css'

import { format } from 'date-fns'
import Button from './HelperButtons/Button/Button'
import {
    checkIfCellExist,
    compareTwoCells,
    shuffleArray,
} from '../utils/functions/utilFunctions'

const Puzzle = () => {
    const current_date = new Date()
    const month_and_date = format(current_date, 'MMMM dd')
    const year = format(current_date, 'yyyy')

    const [mistakesLeft, setMistakesLeft] = useState<number>(4)
    const [selectedCells, setSelectedCells] = useState<ICell[]>([])

    const api_data: Data = {
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
    const [data, setData] = useState<ICell[]>(
        api_data.categories
            .flatMap((category: Category) =>
                category.items.map((item) => ({
                    ...item,
                    category: category.category,
                }))
            )
            .sort((a, b) => a.position - b.position)
    )

    const cellClickCallbackFunction = (selectedCell: ICell) => {
        setSelectedCells((prev) => {
            //remove selected Cell from selectedCells array if it exists
            if (checkIfCellExist(selectedCell, prev)) {
                const previous = prev.filter((cell) => {
                    if (!compareTwoCells(cell, selectedCell)) {
                        return cell
                    }
                })

                return previous
            }
            //add if it doesnt exist and there are < 4 selected Cells
            else {
                if (prev.length < 4) {
                    return [...prev, selectedCell]
                }
                return prev
            }
        })
    }

    const handleShuffleClick = () => {
        const positions = Array.from(Array(16).keys(), (x) => x + 1)
        const shuffledPositions: number[] = shuffleArray(positions)

        const shuffledData = data.map((value, index): ICell => {
            return {
                position: shuffledPositions[index],
                item: value.item,
                category: value.category,
            }
        })

        setData(shuffledData.sort((a, b) => a.position - b.position))

        if (selectedCells.length) {
            const meow: ICell[] = []
            shuffledData.forEach((val) =>
                selectedCells.forEach((selectedCell) => {
                    if (
                        selectedCell.item === val.item &&
                        selectedCell.category === val.category
                    ) {
                        meow.push({ ...val, position: val.position })
                    }
                })
            )

            setSelectedCells(meow)
        }
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
                    {data.map((item: ICell) => (
                        <Cell
                            key={item.position}
                            content={item.item.toUpperCase()}
                            isSelected={checkIfCellExist(item, selectedCells)}
                            clickCallbackFunction={() => {
                                cellClickCallbackFunction(item)
                            }}
                            cellDisabled={
                                !checkIfCellExist(item, selectedCells) &&
                                selectedCells.length == 4
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
                <Button
                    className="mx-2 border-1 border-black-200 disabled:opacity-25"
                    content="Shuffle"
                    callbackFunction={() => {
                        handleShuffleClick()
                    }}
                ></Button>
                <Button
                    className="mx-2 border-1 border-black-200 disabled:opacity-25"
                    content="Deselect All"
                    callbackFunction={() => {
                        setSelectedCells([])
                    }}
                    disabled={!(selectedCells.length > 0)}
                ></Button>
                <Button
                    className="mx-2 border-1 bg-black text-white border-white-200 disabled:opacity-25"
                    content="Submit"
                    callbackFunction={() => {
                        console.log('Submit')
                    }}
                    disabled={!(selectedCells.length === 4)}
                ></Button>
            </div>
        </>
    )
}

export default Puzzle
