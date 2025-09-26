export interface Item {
    item: string
    position: number,
    isGuessed: boolean
}

export interface Category {
    category: string
    items: Item[],
    isGuessed: boolean
}

export interface Data {
    categories: Category[]
}

export interface ICell {
    position: number
    category: string
    item: string
}

export interface SolvedCategory {
    category: string
    items: ICell[]
    solvedOrder: number
}

export interface ProcessedData {
    category: string;
    item: string;
    position: number;
    isGuessed: boolean
}

export interface GameState {
    hasSolvedCategories: boolean
    hasNoMistakesLeft: boolean
    canDeselect: boolean
    canSubmit: boolean
    showGameControls: boolean
}

export interface PuzzleViewProps {
    currentDate: Date
    mistakesLeft: number
    selectedCells: ProcessedData[]
    solvedCategories: SolvedCategory[]
    isGameComplete: boolean
    disableButton: boolean
    data: ProcessedData[]
    gameState: GameState
    onCellClick: (cell: ProcessedData) => void
    onShuffleClick: () => void
    onSubmitClick: () => void
    onDeselectAll: () => void
}