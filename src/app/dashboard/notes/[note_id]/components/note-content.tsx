"use client"
import React from "react";
import { getNote } from "../api/get-note";
import EditOutline from "./assets/edit-outline.svg";
import DeleteOutline from "./assets/delete-outline.svg";
import Image from "next/image";
import NoteSkeleton from "./note-skeleton";
import NoteError from "./note-error";
import { deleteNote } from "../api/delete-note";
import { useRouter } from "next/navigation";
import { Note } from "../../types";

const NoteContent = ({ noteId }: { noteId: number }) => {
    const [note, setNote] = React.useState<Note|null>(null);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    React.useEffect(() => {
        const loadNote = async () => {
            setLoading(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const response = await getNote(noteId);
                await delay;
                setNote(response);
            } catch (e: unknown) {
                await delay;
                if(typeof e === "number")
                    setErrorStatus(e);
                else
                    setErrorStatus(500);
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
            router.push("/dashboard/notes");
        } catch (e: unknown) {
            await delay;
            setLoading(false);
            if(typeof e === "number")
                setErrorStatus(e);
            else
                setErrorStatus(500);
        }
    }

    if(errorStatus) return <NoteError status={errorStatus} />;
    if(!note) return <NoteSkeleton />;

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="mt-8 bg-blue-100">tags here</div>
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
                            className="bg-gray-100 rounded-full p-3 hover:shadow-sm hover:cursor-pointer"
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
                            className="bg-gray-100 rounded-full p-3 hover:shadow-sm hover:cursor-pointer"
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