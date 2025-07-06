"use client"
import React from "react";
import { getNote } from "../api/get-note";
import EditOutline from "../../../assets/edit-outline.svg";
import DeleteOutline from "../../../assets/delete-outline.svg";
import Image from "next/image";
import NoteSkeleton from "./note-skeleton";
import { deleteNote } from "../api/delete-note";
import { useRouter } from "next/navigation";
import { Note } from "../../types";
import { CategorySnippet } from "../../../../dashboard/categories/types";
import { getCategorySnippet } from "../api/get-category-snippet";
import toast from "react-hot-toast";

const NoteContent = ({ noteId }: { noteId: number }) => {
    const [note, setNote] = React.useState<Note|null>(null);
    const [categorySnippet, setCategorySnippet] = React.useState<CategorySnippet|null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        const loadNote = async () => {
            setLoading(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const responseNote = await getNote(noteId);
                const responseCategory = responseNote.categoryId ? await getCategorySnippet(responseNote.categoryId) : null;
                await delay;
                setNote(responseNote);
                setCategorySnippet(responseCategory);
            } catch (e: unknown) {
                await delay;
                toast.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        }
        loadNote();
    }, [noteId]);

    const handleDeleteNote = async () => {
        setLoading(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 850));
        try{
            const response = await deleteNote(noteId);
            await delay;
            toast.success(response.message);
            router.push("/dashboard/notes");
        } catch (e: unknown) {
            await delay;
            setLoading(false);
            toast.error((e as Error).message);
        }
    }

    if(!note) return <NoteSkeleton />;

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="mt-8 mx-1">
            {
                categorySnippet ?
                <button 
                    className={`w-full rounded-lg ${categorySnippet.backgroundColor} p-2 shadow-sm outline-gray-500 hover:cursor-pointer hover:shadow-md focus-visible:outline-2`}
                    title={`Go to category "${categorySnippet.name}"`}
                    type="button"
                    onClick={() => router.push(`/dashboard/categories/${categorySnippet.id}`)}
                >
                    <p className={`${categorySnippet.nameColor} bg-clip-text text-transparent text-lg text-center font-extrabold antialiased`}>{categorySnippet.name}</p>
                </button>
                :
                <div className="bg-[#f0f4ff] rounded-lg p-2 outline-none">
                    <p className="text-lg text-gray-400 text-center font-extrabold antialiased">No category</p>
                </div>
            }
            </div>
            <div className="mt-5">
                <h1 className="text-4xl text-gray-900 font-semibold antialiased">{note.title}</h1>
            </div>
            <div className="flex-1 mt-5">
                <p className="text-base text-gray-400 antialiased">{note.text}</p>
            </div>  
            <ul className="flex justify-end space-x-5 pt-5 pb-8 px-4">
                {
                    loading ? 
                        <div className="animate-pulse flex-1 h-[16px] my-4 bg-sky-200 rounded-md [transition:background-color_350ms]" />
                    :
                    <>
                        <button 
                            className="bg-gray-100 rounded-full p-3 outline-gray-500 hover:shadow-sm hover:cursor-pointer focus-visible:outline-2"
                            title="Edit note"
                            type="button"
                            onClick={() => router.push(`/dashboard/notes/${note.id}/update`)}
                        >
                            <Image 
                                src={EditOutline}
                                alt="Edit"
                                className="size-[24px]"
                            />
                        </button>
                        <button 
                            className="bg-gray-100 rounded-full p-3 outline-gray-500 hover:shadow-sm hover:cursor-pointer focus-visible:outline-2"
                            title="Delete note"
                            type="button"
                            onClick={handleDeleteNote}
                        >
                            <Image 
                                src={DeleteOutline}
                                alt="Delete"
                                className="size-[24px]"
                            />
                        </button>
                    </>
                    }
            </ul>
        </div>
    );
}

export default NoteContent;