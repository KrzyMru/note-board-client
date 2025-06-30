"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateCategoryFormData } from "../types";
import React from "react";
import Image from "next/image";
import LoadingLoop from "../../../../../assets/loading-loop.svg";
import { updateCategory } from "../api/update-category";
import { useRouter } from "next/navigation";
import { Category } from "../../../types";
import { getCategory } from "../../api/get-category";

const UpdateCategoryForm = ({ categoryId }: { categoryId: number }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateCategoryFormData>();
    const [loadingCategory, setLoadingCategory] = React.useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    React.useEffect(() => {
        const loadCategory = async () => {
            setLoadingCategory(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const response = await getCategory(categoryId);
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
                setLoadingCategory(false);
            }
        }
        loadCategory();
    }, [categoryId]);

    const onSubmit: SubmitHandler<UpdateCategoryFormData> = async (formData) => {
        setLoadingSubmit(true);
        const delay = new Promise((resolve) => setTimeout(resolve, 350));
        try {
            const response = await updateCategory(formData);
            await delay;
            router.push(`/dashboard/categorys/${response.id}`);
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

        </form>
    );
}

export default UpdateCategoryForm;