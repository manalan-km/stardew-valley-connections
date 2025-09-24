import { useEffect, useState } from 'react'
import type {
    Category,
    Data,
    ProcessedData,
    SolvedCategory,
} from '../utils/models/Data'
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
import { MAX_ITEMS_IN_A_CATEGORY } from '../utils/constants/constants'
import SolvedItems from './solvedItems/solvedItems'

const Puzzle = () => {
    const current_date = new Date()
    const month_and_date = format(current_date, 'MMMM dd')
    const year = format(current_date, 'yyyy')

    const [mistakesLeft, setMistakesLeft] = useState<number>(4)
    const [selectedCells, setSelectedCells] = useState<ProcessedData[]>([])

    const [solvedCategories, setSolvedCategories] = useState<SolvedCategory[]>(
        []
    )
    const [isGameComplete, setIsGameComplete] = useState<boolean>(false)

    const [disableButton, setDisableButton] = useState<boolean>(false)

    const [data, setData] = useState<ProcessedData[]>([]) // Start with empty array

    const [solvedOrder, setSolvedOrder] = useState<number>(1)

    const filterGuessedCategories = (data: ProcessedData[]) => {
        let guessedSolveOrder = solvedOrder
        const filteredItems = data.filter((item) => item.isGuessed)

        let filteredCategories: string[] = []

        for (const dataItem of data) {
            if (dataItem.isGuessed) {
                filteredCategories.push(dataItem.category)
            }
        }

        filteredCategories = [...new Set(filteredCategories)]

        if (filteredCategories.length === 0) {
            return
        }

        console.log(`Categories that are guessed:`, filteredCategories)
        console.log(`data that are guessed:`, filteredItems)

        filteredCategories.forEach((category) => {
            const itemsInCategory = filteredItems.filter(
                (item) => item.category === category
            )

            const solvedCategory: SolvedCategory = {
                category: category,
                items: [...itemsInCategory],
                solvedOrder: guessedSolveOrder++,
            }

            setSolvedCategories((prev) => [...prev, solvedCategory])

            const solvedItemNames = itemsInCategory.map((cell) => cell.item)
            setData((prev) =>
                prev.filter((cell) => !solvedItemNames.includes(cell.item))
            )

            setSelectedCells([])
        })
        setSolvedOrder(guessedSolveOrder)
    }

    useEffect(() => {
        const url =
            import.meta.env.SV_API_BASE_URL +
            '/challenge/' +
            format(current_date, 'dd-MM-yyyy')
        fetch(url)
            .then((response) => response.json())
            .then((api_data: Data) => {
                const processedData: ProcessedData[] = api_data.categories
                    .flatMap((category: Category) => {
                        return category.items.map((item) => ({
                            ...item,
                            category: category.category,
                        }))
                    })
                    .sort((a, b) => a.position - b.position)
                setData(processedData)

                filterGuessedCategories(processedData)
            })
            .catch((err) => {
                console.log(err.message)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cellClickCallbackFunction = (selectedCell: ProcessedData) => {
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
                if (prev.length < MAX_ITEMS_IN_A_CATEGORY) {
                    return [...prev, selectedCell]
                }
                return prev
            }
        })
    }

    const handleShuffleClick = () => {
        const positions = Array.from(Array(16).keys(), (x) => x + 1)
        const shuffledPositions: number[] = shuffleArray(positions)

        const shuffledData = data.map((value, index): ProcessedData => {
            return {
                position: shuffledPositions[index],
                item: value.item,
                category: value.category,
                isGuessed: value.isGuessed,
            }
        })

        setData(shuffledData.sort((a, b) => a.position - b.position))

        if (selectedCells.length) {
            const meow: ProcessedData[] = []
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

    const handleSubmitClick = () => {
        const categoryToBeChecked = selectedCells[0].category
        const selectedCell = selectedCells.filter(
            (cellVal) => cellVal.category === categoryToBeChecked
        )

        if (selectedCell.length === MAX_ITEMS_IN_A_CATEGORY) {
            const solvedCategory: SolvedCategory = {
                category: categoryToBeChecked,
                items: [...selectedCells],
                solvedOrder: solvedOrder,
            }

            setSolvedCategories((prev) => [...prev, solvedCategory])

            setData((prev) =>
                prev.map((cell) => {
                    if (cell.category === categoryToBeChecked) {
                        cell.isGuessed = true
                    }
                    return cell
                })
            )

            setSolvedOrder(solvedOrder + 1)
            setSelectedCells([])
        } else {
            const newNumberOfMistakesLeft = mistakesLeft - 1
            setMistakesLeft(newNumberOfMistakesLeft)

            setSelectedCells([])

            if (newNumberOfMistakesLeft === 0) {
                setDisableButton(true)
            }
        }
    }

    useEffect(() => {
        if (solvedCategories.length === 4) {
            setIsGameComplete(true)
            setDisableButton(true)
        }
    }, [solvedCategories.length])

    return (
        <>
            <div className="mx-20 my-10 ">
                <span className="libre-franklin-thin">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
            <div className="description flex justify-center my-4">
                Create four groups of four!
            </div>

            {solvedCategories.length > 0 && (
                <SolvedItems solvedCategories={solvedCategories}></SolvedItems>
            )}

            {
                <div className="flex justify-center">
                    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
                        <div className="grid grid-cols-4 gap-2">
                            {data
                                .filter(
                                    (item: ProcessedData) => !item.isGuessed
                                )
                                .map((item: ProcessedData) => (
                                    <Cell
                                        key={item.position}
                                        content={item.item.toUpperCase()}
                                        isSelected={checkIfCellExist(
                                            item,
                                            selectedCells
                                        )}
                                        clickCallbackFunction={() => {
                                            cellClickCallbackFunction(item)
                                        }}
                                        cellDisabled={
                                            !checkIfCellExist(
                                                item,
                                                selectedCells
                                            ) &&
                                            selectedCells.length ===
                                                MAX_ITEMS_IN_A_CATEGORY &&
                                            !disableButton
                                        }
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            }

            {isGameComplete && (
                <div className="text-center my-8">
                    <h2 className="text-2xl font-bold text-green-600 announcement">
                        Congratulations! You have solved today's puzzle!
                    </h2>
                </div>
            )}

            {(mistakesLeft === 0 || mistakesLeft < 0) && (
                <div className="text-center my-8">
                    <h2 className="text-2xl font-bold text-red-600 announcement">
                        No more attempts left!
                    </h2>
                </div>
            )}

            {!isGameComplete && mistakesLeft > 0 && (
                <>
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
                                handleSubmitClick()
                            }}
                            disabled={
                                !(
                                    selectedCells.length ===
                                    MAX_ITEMS_IN_A_CATEGORY
                                )
                            }
                        ></Button>
                    </div>
                </>
            )}
        </>
    )
}

export default Puzzle
