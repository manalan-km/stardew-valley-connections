// PuzzleContainer.tsx
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import type {
    Category,
    Data,
    ProcessedData,
    SolvedCategory,
} from '../utils/models/Data'
import {
    checkIfCellExist,
    compareTwoCells,
    shuffleArray,
} from '../utils/functions/utilFunctions'
import { MAX_ITEMS_IN_A_CATEGORY } from '../utils/constants/constants'
import PuzzleView from './PuzzleViewer'
import { AnimationSequencer } from '../utils/AnimationSequencer'

const PuzzleHandler = () => {
    const animationSequencer = new AnimationSequencer()

    const current_date = new Date()

    const [mistakesLeft, setMistakesLeft] = useState<number>(4)
    const [selectedCells, setSelectedCells] = useState<ProcessedData[]>([])
    const [solvedCategories, setSolvedCategories] = useState<SolvedCategory[]>(
        []
    )
    const [isGameComplete, setIsGameComplete] = useState<boolean>(false)
    const [disableButton, setDisableButton] = useState<boolean>(false)
    const [data, setData] = useState<ProcessedData[]>([])
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
                            id: `${item.position}`,
                        }))
                    })
                    .sort((a, b) => a.position - b.position)
                setData(processedData)
                filterGuessedCategories(processedData)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [])

    const handleCellClick = (selectedCell: ProcessedData) => {
        setSelectedCells((prev) => {
            if (checkIfCellExist(selectedCell, prev)) {
                return prev.filter(
                    (cell) => !compareTwoCells(cell, selectedCell)
                )
            } else {
                if (prev.length < MAX_ITEMS_IN_A_CATEGORY) {
                    return [...prev, selectedCell]
                }
                return prev
            }
        })
    }

    const handleShuffleClick = () => {
        const elementsToAnimate = document.querySelectorAll('#cell-content')

        animationSequencer.add({
            targets: elementsToAnimate,
            animeParams: {
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                onComplete: () => {
                    // Shuffle the data while faded out
                    const positions = Array.from(Array(16).keys(), (x) => x + 1)
                    const shuffledPositions: number[] = shuffleArray(positions)

                    const shuffledData = data.map(
                        (value, index): ProcessedData => {
                            return {
                                ...value,
                                position: shuffledPositions[index],
                                item: value.item,
                                category: value.category,
                                isGuessed: value.isGuessed,
                            }
                        }
                    )

                    setData(
                        shuffledData.sort((a, b) => a.position - b.position)
                    )

                    if (selectedCells.length) {
                        const updatedSelectedCells: ProcessedData[] = []
                        shuffledData.forEach((val) =>
                            selectedCells.forEach((selectedCell) => {
                                if (
                                    selectedCell.item === val.item &&
                                    selectedCell.category === val.category
                                ) {
                                    updatedSelectedCells.push({
                                        ...val,
                                        position: val.position,
                                    })
                                }
                            })
                        )
                        setSelectedCells(updatedSelectedCells)
                    }

                    setTimeout(() => {
                        const newElements =
                            document.querySelectorAll('#cell-content')
                        animationSequencer.add({
                            targets: newElements,
                            animeParams: {
                                opacity: [0, 1],
                                duration: 300,
                                easing: 'easeOutQuad',
                            },
                        })
                    }, 10) // Increased timeout
                },
            },
        })
    }
    const handleSubmitClick = () => {
        const categoryToBeChecked = selectedCells[0].category

        const selectedCellID: string[] = selectedCells.map((cell) => {
            return cell.id
        })

        const selectedCell = selectedCells.filter(
            (cellVal) => cellVal.category === categoryToBeChecked
        )
        const isGuessed: boolean =
            selectedCell.length === MAX_ITEMS_IN_A_CATEGORY

        selectedCellID.forEach((id, index) => {
            const cell = document.getElementById(id)
            const isLastCell = index === selectedCellID.length - 1
            if (cell) {
                animationSequencer.add({
                    targets: cell,
                    animeParams: {
                        scale: [1, 1.1, 1],
                        duration: 500,
                        delay: index * 100,
                        onComplete: () => {
                            if (isLastCell && isGuessed) {
                                const solvedCategory: SolvedCategory = {
                                    category: categoryToBeChecked,
                                    items: [...selectedCell],
                                    solvedOrder: solvedOrder,
                                }

                                setSolvedCategories((prev) => [
                                    ...prev,
                                    solvedCategory,
                                ])

                                setData((prev) =>
                                    prev.map((cell) => {
                                        if (
                                            cell.category ===
                                            categoryToBeChecked
                                        ) {
                                            cell.isGuessed = true
                                        }
                                        return cell
                                    })
                                )

                                setSolvedOrder(solvedOrder + 1)
                                setSelectedCells([])
                            }
                            if (!isGuessed) {
                                const newNumberOfMistakesLeft = mistakesLeft - 1
                                setMistakesLeft(newNumberOfMistakesLeft)
                                setSelectedCells([])

                                if (newNumberOfMistakesLeft === 0) {
                                    setDisableButton(true)
                                }
                            }
                        },
                    },
                })
            }
        })
    }

    const handleDeselectAll = () => {
        setSelectedCells([])
    }

    useEffect(() => {
        if (solvedCategories.length === 4) {
            setIsGameComplete(true)
            setDisableButton(true)
        }
    }, [solvedCategories.length])

    const gameState = {
        hasSolvedCategories: solvedCategories.length > 0,
        hasNoMistakesLeft: mistakesLeft === 0 || mistakesLeft < 0,
        canDeselect: selectedCells.length > 0,
        canSubmit: selectedCells.length === MAX_ITEMS_IN_A_CATEGORY,
        showGameControls: !isGameComplete && mistakesLeft > 0,
    }

    return (
        <PuzzleView
            currentDate={current_date}
            mistakesLeft={mistakesLeft}
            selectedCells={selectedCells}
            solvedCategories={solvedCategories}
            isGameComplete={isGameComplete}
            disableButton={disableButton}
            data={data}
            gameState={gameState}
            onCellClick={handleCellClick}
            onShuffleClick={handleShuffleClick}
            onSubmitClick={handleSubmitClick}
            onDeselectAll={handleDeselectAll}
        />
    )
}

export default PuzzleHandler
