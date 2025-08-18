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
