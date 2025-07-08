"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Add from "../../assets/add.svg";
import { getNoteSnippets } from "../api/get-note-snippets";
import { NoteSnippet } from "../types";
import NoteSkeleton from "./note-skeleton";
import toast from "react-hot-toast";

const NotesContent = () => {
    const [noteSnippets, setNoteSnippets] = React.useState<NoteSnippet[]>([]);
    const [searchText, setSearchText] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        const loadNotes = async () => {
            setLoading(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const response = await getNoteSnippets();
                await delay;
                setNoteSnippets(response);
            } catch (e: unknown) {
                await delay;
                toast.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        }
        loadNotes();
    }, []);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex mx-2 mt-8 mb-10 md:mx-10">
                <input 
                    className="w-full p-2 rounded-full text-gray-400 font-semibold outline-1 outline-gray-300 placeholder:text-center disabled:pointer-events-none disabled:cursor-default disabled:text-gray-300 disabled:outline-gray-200 focus-visible:outline-2 focus-visible:outline-gray-500 focus-visible:text-gray-500 focus-visible:placeholder:text-white"
                    title="Search notes"
                    type="search"
                    placeholder="Search notes"
                    autoComplete="off"
                    disabled={loading}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>
            <div className="flex flex-wrap justify-between px-2 mb-5 md:px-10">
                <h1 className="text-4xl text-gray-900 font-semibold antialiased">Notes</h1>
                <ul className="flex justify-end items-center space-x-5">
                    <button 
                        className="bg-gray-100 rounded-full p-3 shrink-0 outline-gray-500 hover:shadow-sm hover:cursor-pointer focus-visible:outline-2"
                        title="Create a new note"
                        type="button"
                        onClick={() => router.push("/dashboard/notes/new")}
                    >
                        <Image 
                            src={Add}
                            alt="Add"
                            className="size-[24px]"
                        />
                    </button>
                </ul>
            </div>
            <div className="flex-1 overflow-auto py-2 min-h-[300px]">
                <ul className="grid auto-rows-min grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 px-2">
                    {
                        loading ? 
                        Array.from({ length: 10 }).map((_, i) => 
                            <li key={i}>
                                <NoteSkeleton />
                            </li>
                        ) :
                        noteSnippets
                            .filter(note => note.title.includes(searchText))
                            .sort((a, b) => {
                                if (a.pinned === b.pinned)
                                    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
                                else
                                    return Number(b.pinned) - Number(a.pinned);
                            })
                            .map((note) => {
                                const noteCreationDate = new Date(note.creationDate).toLocaleString("en-US", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                });
                                return (
                                    <li key={note.id}>
                                        <button 
                                            className="w-full relative min-h-35 flex flex-col bg-gray-50 rounded-xl p-5 space-y-2 shadow-sm outline-gray-500 hover:cursor-pointer hover:shadow-md focus-visible:outline-2"
                                            title={`Select ${note.title}`}
                                            type="button"
                                            onClick={() => router.push(`/dashboard/notes/${note.id}`)}
                                        >
                                            {note.pinned &&
                                                <div className="absolute top-1 right-1 size-5 shadow-sm rounded-full flex items-center justify-center bg-amber-300/70">
                                                    <div className="size-2 shadow-sm rounded-full bg-black"></div>
                                                </div>
                                            }
                                            <p className="text-base text-left text-gray-900 font-semibold antialiased line-clamp-1">{note.title}</p>
                                            <p className="flex-1 text-sm text-left text-gray-400 antialiased line-clamp-3">{note.text}</p>
                                            <p className="-mb-4 text-xs text-right text-gray-400 italic antialiased line-clamp-2">{noteCreationDate}</p>
                                        </button>
                                    </li>
                                )
                            })
                    }
                </ul>
            </div>
        </div>
    );
}

export default NotesContent;