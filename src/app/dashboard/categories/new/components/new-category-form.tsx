"use client"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import Image from "next/image";
import LoadingLoop from "../../../../assets/loading-loop.svg";
import { useRouter } from "next/navigation";
import { NewCategoryFormData } from "../types";
import TailwindPalette from "./tailwind-palette";
import { createCategory } from "../api/create-category";

const NewCategoryForm = () => {
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm<NewCategoryFormData>({
        defaultValues: {
            backgroundColor: "bg-gray-200",
            nameColor: "bg-gray-400",
        }
    });
    const [loading, setLoading] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    const onSubmit: SubmitHandler<NewCategoryFormData> = async (formData) => {
        setLoading(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const response = await createCategory(formData);
            await delay;
            router.push(`/dashboard/categories/${response.id}`);
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

    const name = watch("name");
    const backgroundColor = watch("backgroundColor");
    const nameColor = watch("nameColor");

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-auto p-2"
        >
            <div className="flex-1 flex flex-col space-y-3">
                <div className="flex flex-col">
                    <label 
                        htmlFor="name"
                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                    >
                        Name
                    </label>
                    <input 
                        required
                        id="name"
                        title="Name"
                        type="text"
                        placeholder="Name"
                        className="text-base text-slate-700 border-[#cbd5e1] border-1 antialiased bg-[#f0f4ff] rounded-lg p-3 outline-blue-400 focus:outline-2"
                        {...register("name", { required: "Name is required" })}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label 
                        htmlFor="backgroundColor"
                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                    >
                        Background color
                    </label>
                    <Controller
                        name="backgroundColor"
                        control={control}
                        render={({ field }) => (
                            <TailwindPalette value={field.value} onChange={field.onChange} />
                        )}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <label 
                        htmlFor="nameColor"
                        className="text-slate-700 text-xl font-semibold mb-1 tracking-wide"
                    >
                        Name color
                    </label>
                    <Controller
                        name="nameColor"
                        control={control}
                        render={({ field }) => (
                            <TailwindPalette value={field.value} onChange={field.onChange} />
                        )}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-slate-700 text-xl font-semibold mb-1 tracking-wide">
                        Final look
                    </p>
                    <div className={`min-h-35 w-75 flex items-center justify-center ${backgroundColor} rounded-xl p-5 space-y-2 shadow-sm`}>
                        <p className={`text-2xl font-extrabold bg-clip-text text-transparent ${nameColor} antialiased line-clamp-1`}>{name}</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                <button 
                    className="relative flex-1 bg-blue-400 p-3 rounded-lg outline-blue-700 [transition:filter_350ms] hover:bg-blue-500 hover:cursor-pointer disabled:pointer-events-none disabled:brightness-90 focus-visible:outline-2"
                    title="Create category"
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

export default NewCategoryForm;