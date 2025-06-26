"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateNoteFormData } from "../types";
import React from "react";
import Image from "next/image";
import LoadingLoop from "../../../../../assets/loading-loop.svg";
import { updateNote } from "../api/update-note";
import { useRouter } from "next/navigation";
import { Note } from "../../../types";
import { getNote } from "../../api/get-note";

const UpdateNoteForm = ({ noteId }: { noteId: number }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateNoteFormData>();
    const [loadingNote, setLoadingNote] = React.useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    React.useEffect(() => {
        const loadNote = async () => {
            setLoadingNote(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const response = await getNote(noteId);
                await delay;
                reset(response);
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
            const response = await updateNote(formData);
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
                <div className="flex flex-col">
                    <input type="hidden" {...register("id")} />
                    <input type="hidden" {...register("categoryId")} />
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