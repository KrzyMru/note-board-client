"use client"
import Image from "next/image";
import NoteStackOutline from "./assets/note-stack-outline.svg";
import CategoryOutline from "./assets/category-outline.svg";
import Logout from "./assets/logout.svg";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "../api/sign-out";
import toast from "react-hot-toast";

const NavigationBar = () => {
    const currentPage = usePathname();
    const router = useRouter();

    const handleSignOut = async () => {
        const response = await signOut();
        toast.success(response.message);
        router.push("/auth/sign-in");
    }

    return (
        <nav className="flex flex-1 flex-row flex-wrap items-end md:flex-col md:flex-nowrap">
            <button 
                className={`flex flex-1 min-w-[160px] p-2 [transition:box-shadow_350ms] box-border shadow-[inset_0_-3px_0_0] md:shadow-[inset_3px_0_0_0] ${currentPage.startsWith("/dashboard/notes") ? "shadow-black" : "shadow-white"} outline-none md:pl-10 md:w-full md:flex-none hover:cursor-pointer hover:bg-gray-50 hover:shadow-gray-300 active:bg-gray-100 focus-visible:shadow-gray-300`}
                type="button"
                title="See all notes"
                onClick={() => router.push("/dashboard/notes")}
                onMouseEnter={() => router.prefetch("/dashboard/notes")}
            >
                <Image 
                    src={NoteStackOutline}
                    alt="Note stack icon"
                    className="size-[24px] shrink-0 mr-5"
                />
                <p className={`text-base font-semibold antialiased line-clamp-1 [transition:color_350ms] ${currentPage.startsWith("/dashboard/notes") ? "text-gray-900" : "text-gray-300"}`}>Notes</p>
            </button>
            <button
                className={`flex flex-1 min-w-[160px] p-2 [transition:box-shadow_350ms] box-border shadow-[inset_0_-3px_0_0] md:shadow-[inset_3px_0_0_0] ${currentPage.startsWith("/dashboard/categories") ? "shadow-black" : "shadow-white"} outline-none md:pl-10 md:w-full md:flex-none hover:cursor-pointer hover:bg-gray-50 hover:shadow-gray-300 active:bg-gray-100 focus-visible:shadow-gray-300`}
                type="button"
                title="See all categories"
                onClick={() => router.push("/dashboard/categories")}
                onMouseEnter={() => router.prefetch("/dashboard/categories")}
            >
                <Image 
                    src={CategoryOutline}
                    alt="Categories icon"
                    className="size-[24px] shrink-0 mr-5"
                />
                <p className={`text-base font-semibold antialiased line-clamp-1 [transition:color_350ms] ${currentPage.startsWith("/dashboard/categories") ? "text-gray-900" : "text-gray-300"}`}>Categories</p>
            </button>
            <button 
                className={`flex p-2 [transition:box-shadow_350ms] box-border inset-ring-gray-400 outline-none md:rounded-bl-xl md:pl-4 md:w-full md:flex-none md:mt-auto md:hover:inset-ring-0 hover:cursor-pointer hover:bg-gray-50 hover:inset-ring-4 active:bg-gray-100 focus-visible:inset-ring-3`}
                type="button"
                title="Sign out"
                onClick={handleSignOut}
            >
                <Image 
                    src={Logout}
                    alt="Logout icon"
                    className="size-[24px] shrink-0 md:mr-5"
                />
                <p className={`hidden text-base font-semibold antialiased line-clamp-1 text-gray-900 md:block`}>Sign out</p>
            </button>
        </nav>
    );
}

export default NavigationBar;