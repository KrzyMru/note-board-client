interface Note {
    id: number,
    title: string,
    text: string,
    categoryId: number|null,
    userId: number,
}

interface NoteSnippet {
    id: number,
    title: string,
    text: string,
}

export type { Note, NoteSnippet }