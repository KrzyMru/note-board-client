"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { NewNoteFormData } from "../types";
import React from "react";
import Image from "next/image";
import LoadingLoop from "../../../../assets/loading-loop.svg";
import { createNote } from "../api/create-note";
import { useRouter } from "next/navigation";

const NewNoteForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewNoteFormData>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    const onSubmit: SubmitHandler<NewNoteFormData> = async (formData) => {
        setLoading(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const response = await createNote(formData);
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
            setLoading(false);
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col"
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
                        required
                        id="title"
                        title="Title"
                        type="text"
                        placeholder="Title"
                        className="text-base text-slate-700 border-[#cbd5e1] border-1 antialiased bg-[#f0f4ff] rounded-lg p-3 outline-blue-400 focus:outline-2"
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
                        className="resize-none flex-1 text-base text-slate-700 border-[#cbd5e1] border-1 antialiased bg-[#f0f4ff] rounded-lg p-3 outline-blue-400 focus:outline-2"
                        {...register("text")}
                    />
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button 
                    className="relative flex-1 bg-blue-400 p-3 rounded-lg outline-blue-700 [transition:filter_350ms] hover:bg-blue-500 hover:cursor-pointer disabled:pointer-events-none disabled:brightness-90 focus-visible:outline-2"
                    title="Create note"
                    type="submit"
                    disabled={loading}
                >
                    <p className={`text-base text-white antialiased font-mono uppercase tracking-wide [transition:opacity_350ms] ${loading ? "opacity-0" : "opacity-100"}`}>Submit</p>
                    <Image 
                        src={LoadingLoop}
                        alt="Loading"
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transition:opacity_350ms] ${loading ? "opacity-100" : "opacity-0"}`}
                    />
                </button>
            </div>
        </form>
    );
}

export default NewNoteForm;