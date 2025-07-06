"use client"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NewNoteFormData } from "../types";
import React from "react";
import Image from "next/image";
import LoadingLoop from "../../../../assets/loading-loop.svg";
import { createNote } from "../api/create-note";
import { useRouter } from "next/navigation";
import { getCategorySnippets } from "../../../categories/api/get-category-snippets";
import { CategorySnippet } from "../../../categories/types";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import toast from "react-hot-toast";

const NewNoteForm = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<NewNoteFormData>({
        defaultValues: {
            categoryId: -1, // Keep value type consistent
        }
    });
    const [categorySnippets, setCategorySnippets] = React.useState<CategorySnippet[]>([]);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [loadingCategories, setLoadingCategories] = React.useState<boolean>(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<NewNoteFormData> = async (formData) => {
        setLoadingSubmit(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const correctedCategoryId = Number(formData.categoryId) === -1 ? null : formData.categoryId; // For uncategorized null
            const correctedPayload = { ...formData, categoryId: correctedCategoryId}
            const response = await createNote(correctedPayload);
            await delay;
            toast.success(response.message);
            router.push(`/dashboard/notes/${response.note.id}`);
        } catch (e: unknown) { 
            await delay;
            setLoadingSubmit(false);
            toast.error((e as Error).message);
        }
    }

    React.useEffect(() => {
        const loadCategories = async () => {
            setLoadingCategories(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 350));
            try {
                const response = await getCategorySnippets();
                await delay;
                setCategorySnippets(response);
            } catch (e: unknown) { 
                await delay;
                toast.error((e as Error).message);
            }
            finally {
                setLoadingCategories(false);
            }
        };
        loadCategories();
    }, []);

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-auto p-2"
        >
            <div className="flex-1 flex flex-col space-y-3">
                <div className="flex flex-col">
                    <label 
                        htmlFor="title"
                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                    >
                        Title
                    </label>
                    <input 
                        id="title"
                        title="Title"
                        type="text"
                        placeholder="Title"
                        disabled={loadingSubmit}
                        className="text-base text-gray-600 bg-gray-50 border-gray-200 border-1 shadow-sm antialiased rounded-lg p-3 outline-gray-500 [transition:background-color_350ms,color_350ms] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-2"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
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
                        disabled={loadingSubmit}
                        className="resize-none flex-1 text-base text-gray-600 bg-gray-50 border-gray-200 border-1 shadow-sm antialiased rounded-lg p-3 outline-gray-500 [transition:background-color_350ms,color_350ms] disabled:bg-gray-50 disabled:text-gray-400 focus:outline-2"
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
                                        disabled={loadingSubmit || loadingCategories}
                                        className={`${selectedCategory ? selectedCategory.backgroundColor : "bg-[#f0f4ff]"} shadow-sm rounded-lg p-3 outline-gray-500 [transition:background-color_350ms,color_350ms] hover:cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-default focus:outline-2`}
                                    >
                                        {
                                            selectedCategory ? 
                                            <p className={`${selectedCategory.nameColor} bg-clip-text text-transparent text-lg text-center font-extrabold antialiased`}>{selectedCategory.name}</p>
                                            :
                                            <p className="text-gray-400 text-lg text-center font-extrabold antialiased">No category</p>
                                        }
                                    </ListboxButton>
                                    <ListboxOptions 
                                        anchor="top"
                                        className="mb-1 rounded-lg w-(--button-width) outline-none border-2 border-gray-500"    
                                    >
                                        <ListboxOption 
                                                key={"noCategory"} 
                                                value={-1}
                                                title="Select no category"
                                                className="bg-[#f0f4ff] p-3 outline-none hover:cursor-pointer"
                                            >
                                                <p className="text-gray-400 text-lg text-center font-extrabold antialiased">No category</p>
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
                    className="relative flex-1 bg-slate-400 p-3 shadow-sm rounded-lg outline-slate-500 [transition:filter_350ms] hover:bg-slate-500 hover:cursor-pointer disabled:pointer-events-none disabled:brightness-110 focus-visible:outline-2"
                    title="Create note"
                    type="submit"
                    disabled={loadingSubmit || loadingCategories}
                >
                    <p className={`text-base text-white font-bold antialiased font-mono uppercase tracking-wide [transition:opacity_350ms] ${loadingSubmit ? "opacity-0" : "opacity-100"}`}>Submit</p>
                    <Image 
                        src={LoadingLoop}
                        alt="Loading"
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transition:opacity_350ms] ${loadingSubmit ? "opacity-100" : "opacity-0"}`}
                    />
                </button>
            </div>
        </form>
    );
}

export default NewNoteForm;