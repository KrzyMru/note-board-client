import NoteContent from "./components/note-content";

const Page = async ({ params }: { params: Promise<{ note_id: number }> }) => {
    const { note_id } = await params;

    return <NoteContent noteId={note_id} />;
}

export default Page;