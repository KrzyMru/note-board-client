import Image from "next/image";
import NotePad from "../../../../public/note-pad.svg";

const MainBanner = () => {
    return (
        <div className="flex items-center flex-nowrap mt-5 mb-10 mr-15 ml-5">
            <div className="w-fit p-2 mr-3 rounded-full">
                <Image 
                    src={NotePad}
                    alt="Notepad logo"
                    className="size-[42px]"
                />
            </div>
            <p className="text-xl font-bold text-gray-900 antialiased line-clamp-1">Note-Board</p>
        </div>
    );
}

export default MainBanner;