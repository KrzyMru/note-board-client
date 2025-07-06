"use client"
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormData } from "../../types";
import { signIn } from "../api/sign-in";
import { useRouter } from "next/navigation";
import LoadingLoop from "../../../assets/loading-loop.svg";
import Image from "next/image";
import toast from "react-hot-toast";

const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const router = useRouter();

    const onSubmit: SubmitHandler<AuthFormData> = async (formData) => {
        setLoading(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const response = await signIn(formData);
            await delay;
            toast.success(response.message);
            router.push("/dashboard/notes");
        } catch (e: unknown) {
            await delay;
            setLoading(false);
            toast.error((e as Error).message);
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="w-70"
        >
            <div className="flex flex-col space-y-3 mb-5">
                <input 
                    title="Email"
                    type="email"
                    placeholder="Email"
                    className="shadow-sm text-sm text-gray-500 antialiased bg-gray-100 rounded-lg p-3 outline-gray-400 focus:outline-2"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                <input 
                    title="Password"
                    type="password"
                    placeholder="Password"
                    className="shadow-sm text-sm text-gray-500 antialiased bg-gray-100 rounded-lg p-3 outline-gray-400 focus:outline-2"
                    {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <button 
                className="relative w-full bg-slate-400 shadow-sm rounded-lg p-2 outline-slate-500 [transition:filter_350ms] hover:bg-slate-500 hover:cursor-pointer disabled:pointer-events-none disabled:brightness-110 focus-visible:outline-2"
                title="Sign in"
                type="submit"
                disabled={loading}
            >
                <p className={`text-sm font-bold text-white antialiased [transition:opacity_350ms] ${loading ? "opacity-0" : "opacity-100"}`}>Sign in</p>
                <Image 
                    src={LoadingLoop}
                    alt="Loading"
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transition:opacity_350ms] ${loading ? "opacity-100" : "opacity-0"}`}
                />
            </button>
        </form>
    );
}

export default SignInForm;