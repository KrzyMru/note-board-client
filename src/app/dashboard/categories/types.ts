interface Category {
    id: number,
    name: string,
    backgroundColor: string,
    nameColor: string,
    userId: number,
}

interface CategorySnippet {
    id: number,
    name: string,
    backgroundColor: string,
    nameColor: string,
}

export type { Category, CategorySnippet }