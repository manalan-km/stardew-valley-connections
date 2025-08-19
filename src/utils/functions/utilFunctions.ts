import type { ICell } from '../models/Data'

export const compareTwoCells = (cellOne: ICell, cellTwo: ICell) => {
    return (
        cellOne.item === cellTwo.item && cellOne.category === cellTwo.category
    )
}

export const checkIfCellExist = (item: ICell, selectedCells: ICell[]) => {
    return selectedCells.some((cell) => compareTwoCells(cell, item))
}

export function shuffleArray(array: number[]) {
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }
    return array
}
