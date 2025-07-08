interface Note {
    id: number,
    title: string,
    text: string,
    categoryId: number|null,
    userId: number,
    pinned: boolean,
    creationDate: string,
}

interface NoteSnippet {
    id: number,
    title: string,
    text: string,
    pinned: boolean,
    creationDate: string,
}

export type { Note, NoteSnippet }