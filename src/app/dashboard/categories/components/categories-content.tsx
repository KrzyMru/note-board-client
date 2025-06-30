"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Add from "./assets/add.svg";
import { getCategorySnippets } from "../api/get-category-snippets";
import CategorySkeleton from "./category-skeleton";
import { Category, CategorySnippet } from "../types";

const CategoriesContent = () => {
    const [categorySnippets, setCategorySnippets] = React.useState<CategorySnippet[]>([]);
    const [searchText, setSearchText] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(false);
    const [errorStatus, setErrorStatus] = React.useState<number|null>(null);
    const router = useRouter();

    React.useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);
            const delay = new Promise((resolve) => setTimeout(resolve, 850));
            try{
                const response = await getCategorySnippets();
                await delay;
                setCategorySnippets(response);
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
        loadCategories();
    }, []);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex mx-10 mt-8 mb-10">
                <input 
                    className="w-full p-2 rounded-full text-gray-400 font-semibold outline-1 outline-gray-300 placeholder:text-center disabled:pointer-events-none disabled:cursor-default disabled:text-gray-300 focus-visible:outline-2 focus-visible:outline-gray-900 focus-visible:text-gray-900 focus-visible:placeholder:text-white"
                    title="Search categories"
                    type="search"
                    placeholder="Search categories"
                    autoComplete="off"
                    disabled={loading}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") 
                        ("")
                    }}
                />
            </div>
            <div className="flex justify-between px-10 mb-5">
                <h1 className="text-4xl text-gray-900 font-semibold antialiased">Categories</h1>
                <ul className="flex justify-end items-center space-x-5">
                    <button 
                        className="bg-gray-100 rounded-full p-3 hover:shadow-sm hover:cursor-pointer"
                        title="Create a new category"
                        type="button"
                        onClick={() => router.push("/dashboard/categories/new")}
                    >
                        <Image 
                            src={Add}
                            alt="Add"
                            className="size-[24px]"
                        />
                    </button>
                </ul>
            </div>
            <ul className="flex-1 grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-2 px-2 overflow-auto">
                {
                    loading ? 
                    Array.from({ length: 10 }).map((_, i) => 
                        <li key={i}>
                            <CategorySkeleton />
                        </li>
                    ) :
                    categorySnippets.map((category) => (
                        <li key={category.id}>
                            <button 
                                className={`w-full min-h-35 flex items-center justify-center ${category.backgroundColor} rounded-xl p-5 space-y-2 hover:cursor-pointer hover:shadow-sm`}
                                title={`Select ${category.name}`}
                                type="button"
                                onClick={() => router.push(`/dashboard/categories/${category.id}`)}
                            >
                                <p className={`text-2xl font-extrabold bg-clip-text text-transparent ${category.nameColor} antialiased line-clamp-1`}>{category.name}</p>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default CategoriesContent;