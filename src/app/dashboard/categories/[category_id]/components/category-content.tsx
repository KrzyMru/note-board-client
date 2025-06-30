"use client"
import React from "react";
import { getCategory } from "../api/get-category";
import EditOutline from "./assets/edit-outline.svg";
import DeleteOutline from "./assets/delete-outline.svg";
import Image from "next/image";
import CategorySkeleton from "./category-skeleton";
import NoteSkeleton from "../../../notes/components/note-skeleton";
import CategoryError from "./category-error";
import { deleteCategory } from "../api/delete-category";
import { useRouter } from "next/navigation";
import { Category } from "../../types";
import { NoteSnippet } from "../../../notes/types";
import { getCategoryNoteSnippets } from "../api/get-category-note-snippets";

const CategoryContent = ({ categoryId }: { categoryId: number }) => {
    const [category, setCategory] = React.useState<Category|null>(null);
    const [noteSnippets, setNoteSnippets] = React.useState<NoteSnippet[]>([]);
    const [loadingNotes, setLoadingNotes] = React.useState<boolean>(false);
    const [loadingCategory, setLoadingCategory] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    React.useEffect(() => {
        const loadCategory = async () => {
            setLoadingCategory(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const response = await getCategory(categoryId);
                await delay;
                setCategory(response);
            } catch (e: unknown) {
                await delay;
                if(typeof e === "number")
                    setErrorStatus(e);
                else
                    setErrorStatus(500);
            }
            finally {
                setLoadingCategory(false);
            }
        }
        loadCategory();
    }, [categoryId]);

    React.useEffect(() => {
        if(category) {
            const loadNoteSnippets = async () => {
                setLoadingNotes(true);
                const delay = new Promise((resolve) => setTimeout(resolve, 850));
                try{
                    const response = await getCategoryNoteSnippets(categoryId);
                    await delay;
                    setNoteSnippets(response);
                } catch (e: unknown) {
                    await delay;
                    if(typeof e === "number")
                        setErrorStatus(e);
                    else
                        setErrorStatus(500);
                }
                finally {
                    setLoadingNotes(false);
                }
            }
            loadNoteSnippets();
        }
    }, [category]);

    const handleDeleteCategory = async () => {
        setLoadingCategory(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 850));
        try{
            const response = await deleteCategory(categoryId);
            await delay;
            router.push("/dashboard/categories");
        } catch (e: unknown) {
            await delay;
            setLoadingCategory(false);
            if(typeof e === "number")
                setErrorStatus(e);
            else
                setErrorStatus(500);
        }
    }

    if(errorStatus) return <CategoryError status={errorStatus} />;
    if(!category) return <CategorySkeleton />;

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="mt-8">
                <h1 className="text-4xl text-gray-900 font-semibold antialiased">{category.name}</h1>
            </div>
            <ul className="mt-5 flex-1 grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-2 px-2 overflow-auto">
                {
                    loadingNotes ? 
                    Array.from({ length: 10 }).map((_, i) => 
                        <li key={i}>
                            <NoteSkeleton />
                        </li>
                    ) 
                    :
                    noteSnippets.length === 0 ?
                    <p className="text-base text-gray-400 antialiased col-span-full">This category has no assigned notes yet</p>
                    :
                    noteSnippets.map((note) => (
                        <li key={note.id}>
                            <button 
                                className="w-full min-h-35 flex flex-col bg-gray-50 rounded-xl p-5 space-y-2 hover:cursor-pointer hover:shadow-sm"
                                title={`Select ${note.title}`}
                                type="button"
                                onClick={() => router.push(`/dashboard/notes/${note.id}`)}
                            >
                                <p className="text-base text-left text-gray-900 font-semibold antialiased line-clamp-1">{note.title}</p>
                                <p className="text-sm text-left text-gray-400 antialiased line-clamp-2">{note.text}</p>
                            </button>
                        </li>
                    ))
                }
            </ul>
            <ul className="flex justify-end space-x-5 pt-5 pb-8 px-4">
                {
                    loadingCategory ? 
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