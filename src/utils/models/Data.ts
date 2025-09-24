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