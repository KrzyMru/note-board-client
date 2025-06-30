import NoteSkeleton from "../../../notes/components/note-skeleton";

const CategorySkeleton = () => {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-pulse">
            <div className="h-[40px] bg-gray-100 rounded-lg mt-8" />
            <ul className="mt-5 flex-1 grid auto-rows-min grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 py-2 px-2 overflow-auto">
                {Array.from({ length: 10 }).map((_, i) => 
                    <li key={i}>
                        <NoteSkeleton />
                    </li>
                )}
            </ul>
            <ul className="flex justify-end space-x-5 pt-5 pb-8 px-4">
                <div className="rounded-full bg-gray-100 p-6" />
                <div className="rounded-full bg-gray-100 p-6" />
                <div className="rounded-full bg-gray-100 p-6" />
            </ul>
        </div>
    );
}

export default CategorySkeleton;