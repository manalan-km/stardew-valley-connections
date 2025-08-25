export interface Item {
    item: string
    position: number
}

export interface Category {
    category: string
    items: Item[]
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
