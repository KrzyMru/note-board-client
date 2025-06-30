"use client"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UpdateNoteFormData } from "../types";
import React from "react";
import Image from "next/image";
import LoadingLoop from "../../../../../assets/loading-loop.svg";
import { updateNote } from "../api/update-note";
import { useRouter } from "next/navigation";
import { Note } from "../../../types";
import { getNote } from "../../api/get-note";
import { CategorySnippet } from "../../../../../dashboard/categories/types";
import { getCategorySnippets } from "../../../../../dashboard/categories/api/get-category-snippets";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

const UpdateNoteForm = ({ noteId }: { noteId: number }) => {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<UpdateNoteFormData>({
        defaultValues: {
            categoryId: -1, // Keep value type consistent
        }
    });
    const [categorySnippets, setCategorySnippets] = React.useState<CategorySnippet[]>([]);
    const [loadingNote, setLoadingNote] = React.useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    React.useEffect(() => {
        const loadNote = async () => {
            setLoadingNote(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const responseNote = await getNote(noteId);
                const responseCategories = await getCategorySnippets();
                await delay;
                reset(responseNote);
                setCategorySnippets(responseCategories);
            } catch (e: unknown) {
                await delay;
                if(typeof e === "number")
                    setErrorStatus(e);
                else
                    setErrorStatus(500);
            }
            finally {
                setLoadingNote(false);
            }
        }
        loadNote();
    }, [noteId]);

    const onSubmit: SubmitHandler<UpdateNoteFormData> = async (formData) => {
        setLoadingSubmit(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const correctedCategoryId = Number(formData.categoryId) === -1 ? null : formData.categoryId; // For uncategorized null
            const correctedPayload = { ...formData, categoryId: correctedCategoryId}
            const response = await updateNote(correctedPayload);
            await delay;
            router.push(`/dashboard/notes/${response.id}`);
        } catch (e: unknown) { 
            await delay;
            if(typeof e === "number")
                setErrorStatus(e);
            else
                setErrorStatus(500);
        }
        finally {
            setLoadingSubmit(false);
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col"
        >
            <div className="flex-1 flex flex-col space-y-3">
                <input type="hidden" {...register("id")} />
                <input type="hidden" {...register("categoryId")} />
                <div className="flex flex-col">
                    <label 
                        htmlFor="title"
                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                    >
                        Title
                    </label>
                    <input 
                        required
                        id="title"
                        title="Title"
                        type="text"
                        placeholder="Title"
                        disabled={loadingNote || loadingSubmit}
                        className="text-base text-slate-700 border-[#cbd5e1] border-1 antialiased bg-[#f0f4ff] rounded-lg p-3 outline-blue-400 [transition:background-color_350ms,color_350ms] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-2"
                        {...register("title", { required: "Title is required" })}
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <label 
                        htmlFor="text"
                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                    >
                        Text
                    </label>
                    <textarea
                        id="text"
                        title="Text"
                        placeholder="Text"
                        disabled={loadingNote || loadingSubmit}
                        className="resize-none flex-1 text-base text-slate-700 border-[#cbd5e1] border-1 antialiased bg-[#f0f4ff] rounded-lg p-3 outline-blue-400 [transition:background-color_350ms,color_350ms] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-2"
                        {...register("text")}
                    />
                </div>
                <div className="flex flex-col">
                    <Controller
                        name="categoryId"
                        control={control}
                        render={({ field }) => {
                            const selectedCategory = categorySnippets.find((cat) => cat.id === field.value);
                            return (
                                <Listbox 
                                    value={field.value} 
                                    onChange={field.onChange}
                                >
                                    <label 
                                        htmlFor="category"
                                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                                    >
                                        Category
                                    </label>
                                    <ListboxButton
                                        id="category"
                                        title="Category"
                                        disabled={loadingSubmit || loadingNote}
                                        className={`${selectedCategory ? selectedCategory.backgroundColor : "bg-[#f0f4ff]"} border-[#cbd5e1] border-1 rounded-lg p-3 outline-blue-400 [transition:background-color_350ms,color_350ms] hover:cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-default focus:outline-2`}
                                    >
                                        {
                                            selectedCategory ? 
                                            <p className={`${selectedCategory.nameColor} bg-clip-text text-transparent text-lg text-center font-extrabold antialiased`}>{selectedCategory.name}</p>
                                            :
                                            <p className="text-gray-900 text-lg text-center font-extrabold antialiased">No category</p>
                                        }
                                    </ListboxButton>
                                    <ListboxOptions 
                                        anchor="bottom"
                                        className="mt-1 rounded-lg w-(--button-width) outline-none border-1 border-[#cbd5e1]"    
                                    >
                                        <ListboxOption 
                                                key={"noCategory"} 
                                                value={-1}
                                                title="Select no category"
                                                className="bg-[#f0f4ff] p-3 outline-none hover:cursor-pointer"
                                            >
                                                <p className="text-gray-900 text-lg text-center font-extrabold antialiased">No category</p>
                                        </ListboxOption>
                                        {categorySnippets.map((category) => (
                                            <ListboxOption 
                                                key={category.id} 
                                                value={category.id} 
                                                title={`Select ${category.name}`}
                                                className={`${category.backgroundColor} p-3 outline-none hover:cursor-pointer`}
                                            >
                                                <p className={`${category.nameColor} bg-clip-text text-transparent text-lg text-center font-extrabold antialiased`}>{category.name}</p>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Listbox>
                            );
                        }}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button 
                    className="relative flex-1 bg-blue-400 p-3 rounded-lg outline-blue-700 [transition:filter_350ms] hover:bg-blue-500 hover:cursor-pointer disabled:pointer-events-none disabled:brightness-90 focus-visible:outline-2"
                    title="Update note"
                    type="submit"
                    disabled={loadingNote || loadingSubmit}
                >
                    <p className={`text-base text-white antialiased font-mono uppercase tracking-wide [transition:opacity_350ms] ${!loadingNote && loadingSubmit ? "opacity-0" : "opacity-100"}`}>Submit</p>
                    <Image 
                        src={LoadingLoop}
                        alt="Loading"
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transition:opacity_350ms] ${!loadingNote && loadingSubmit ? "opacity-100" : "opacity-0"}`}
                    />
                </button>
            </div>
        </form>
    );
}

export default UpdateNoteForm;