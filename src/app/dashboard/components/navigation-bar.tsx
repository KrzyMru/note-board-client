"use client"
import Image from "next/image";
import NoteStackOutline from "./assets/note-stack-outline.svg";
import CategoryOutline from "./assets/category-outline.svg"
import { usePathname, useRouter } from "next/navigation";

const NavigationBar = () => {
    const currentPage = usePathname();
    const router = useRouter();

    return (
        <nav>
            <button 
                className="flex w-full p-2 pl-10 outline-white [transition:box-shadow_350ms] hover:cursor-pointer hover:bg-gray-50 active:bg-gray-100 disabled:pointer-events-none disabled:shadow-[inset_3px_0_0_0] box-border focus-visible:outline-2"
                type="button"
                title="See all notes"
                disabled={currentPage.startsWith("/dashboard/notes")}
                onClick={() => router.push("/dashboard/notes")}
            >
                <Image 
                    src={NoteStackOutline}
                    alt="Notepad logo"
                    className="size-[24px] shrink-0 mr-5"
                />
                <p className={`text-base font-semibold antialiased line-clamp-1 [transition:color_350ms] ${currentPage.startsWith("/dashboard/notes") ? "text-gray-900" : "text-gray-300"}`}>Notes</p>
            </button>
            <button
                className="flex w-full p-2 pl-10 outline-white [transition:box-shadow_350ms] hover:cursor-pointer hover:bg-gray-50 active:bg-gray-100 disabled:pointer-events-none disabled:shadow-[inset_3px_0_0_0] box-border focus-visible:outline-2"
                type="button"
                title="See all categories"
                disabled={currentPage.startsWith("/dashboard/categories")}
                onClick={() => router.push("/dashboard/categories")}
            >
                <Image 
                    src={CategoryOutline}
                    alt="Notepad logo"
                    className="size-[24px] shrink-0 mr-5"
                />
                <p className={`text-base font-semibold antialiased line-clamp-1 [transition:color_350ms] ${currentPage.startsWith("/dashboard/categories") ? "text-gray-900" : "text-gray-300"}`}>Categories</p>
            </button>
        </nav>
    );
}

export default NavigationBar;