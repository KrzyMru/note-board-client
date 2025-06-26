import NewNoteForm from "./components/new-note-form";

const Page = () => {

    return (
        <div className="flex-1 flex justify-center">
            <div className="flex-1 flex flex-col pb-8 max-w-xl">
                <div className="mx-10 mt-8 mb-10">
                    <p className="text-center text-4xl text-gray-900 antialiased">Write a new note</p>
                </div>
                <NewNoteForm />
            </div>
        </div>
    );
}

export default Page;