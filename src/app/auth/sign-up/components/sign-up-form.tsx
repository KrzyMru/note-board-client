"use client"
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthFormData } from "../../types";
import { signUp } from "../api/sign-up";
import LoadingLoop from "../../../assets/loading-loop.svg";
import Image from "next/image";

const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
    const [loading, setLoading] = React.useState<boolean>(false);

    const onSubmit: SubmitHandler<AuthFormData> = async (formData) => {
        setLoading(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const response = await signUp(formData);
            await delay;
        } catch (e: unknown) { 
            await delay;
        }
        finally {
            setLoading(false);
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
                    className="shadow-sm text-sm text-[#444444] antialiased bg-[#f7f4f1] rounded-lg p-3 outline-white focus:outline-2"
                    {...register("email", { required: "Email is required" })}
                />
                <input 
                    title="Password"
                    type="password"
                    placeholder="Password"
                    className="shadow-sm text-sm text-[#444444] antialiased bg-[#f7f4f1] rounded-lg p-3 outline-white focus:outline-2"
                    {...register("password", { required: "Password is required" })}
                />
            </div>
            <button 
                className="relative w-full bg-[#b49b87] rounded-md shadow-md p-2 outline-white [transition:filter_350ms] hover:bg-[#a38874] active:bg-[#8f705f] disabled:pointer-events-none disabled:brightness-110 focus-visible:outline-2"
                title="Sign in"
                type="submit"
                disabled={loading}
            >
                <p className={`text-sm text-white antialiased [transition:opacity_350ms] ${loading ? "opacity-0" : "opacity-100"}`}>Sign up</p>
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