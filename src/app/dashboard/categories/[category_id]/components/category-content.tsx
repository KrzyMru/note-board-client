"use client"
import React from "react";
import { getCategory } from "../api/get-category";
import EditOutline from "../../../assets/edit-outline.svg";
import DeleteOutline from "../../../assets/delete-outline.svg";
import Image from "next/image";
import CategorySkeleton from "./category-skeleton";
import { deleteCategory } from "../api/delete-category";
import { useRouter } from "next/navigation";
import { Category } from "../../types";
import { NoteSnippet } from "../../../notes/types";
import { getCategoryNoteSnippets } from "../api/get-category-note-snippets";
import toast from "react-hot-toast";

const CategoryContent = ({ categoryId }: { categoryId: number }) => {
    const [category, setCategory] = React.useState<Category|null>(null);
    const [noteSnippets, setNoteSnippets] = React.useState<NoteSnippet[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    React.useEffect(() => {
        const loadCategory = async () => {
            setLoading(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const responseCategory = await getCategory(categoryId);
                const responseNotes = await getCategoryNoteSnippets(categoryId);
                await delay;
                setCategory(responseCategory);
                setNoteSnippets(responseNotes);
            } catch (e: unknown) {
                await delay;
                toast.error((e as Error).message);
            }
            finally {
                setLoading(false);
            }
        }
        loadCategory();
    }, [categoryId]);

    const handleDeleteCategory = async () => {
        setLoading(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 850));
        try{
            const response = await deleteCategory(categoryId);
            await delay;
            toast.success(response.message);
            router.push("/dashboard/categories");
        } catch (e: unknown) {
            await delay;
            setLoading(false);
            toast.error((e as Error).message);
        }
    }

    if(!category) return <CategorySkeleton />;

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className={`mt-8 py-1 flex items-center ${category.backgroundColor} rounded-lg px-2`}>
                <h1 className={`text-4xl text-gray-900 font-semibold antialiased py-1 bg-clip-text text-transparent ${category.nameColor}`}>{category.name}</h1>
            </div>
            <ul className="mt-5 flex-1 grid auto-rows-min grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 py-2 px-2 overflow-auto">
                {
                    noteSnippets.length === 0 ?
                    <p className="text-base text-gray-400 antialiased col-span-full">This category has no assigned notes yet</p>
                    :
                    noteSnippets.map((note) => {
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
                                    <p className="-mb-4 -mr-3 text-xs text-right text-gray-400 italic antialiased line-clamp-2">{noteCreationDate}</p>
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
            <ul className="flex justify-end space-x-5 pt-5 pb-8 px-4">
                {
                    loading ? 
                        <div className="animate-pulse flex-1 h-[16px] my-4 bg-sky-200 rounded-md [transition:background-color_350ms]" />
                    :
                    <>
                        <button 
                            className="bg-gray-100 rounded-full p-3 hover:shadow-sm hover:cursor-pointer"
                            title="Edit category"
                            type="button"
                            onClick={() => router.push(`/dashboard/categories/${category.id}/update`)}
                        >
                            <Image 
                                src={EditOutline}
                                alt="Edit"
                                className="size-[24px]"
                            />
                        </button>
                        <button 
                            className="bg-gray-100 rounded-full p-3 hover:shadow-sm hover:cursor-pointer"
                            title="Delete category"
                            type="button"
                            onClick={handleDeleteCategory}
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

export default CategoryContent;