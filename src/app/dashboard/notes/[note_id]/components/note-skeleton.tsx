const NoteSkeleton = () => {
    return (
        <div className="flex-1 flex flex-col overflow-y-auto animate-pulse">
            <div className="h-[40px] bg-gray-100 rounded-lg mt-5" />
            <div className="flex-1 bg-gray-100 rounded-lg mt-5" />
            <ul className="flex justify-end space-x-5 py-8 px-4">
                <div className="rounded-full bg-gray-100 p-6" />
                <div className="rounded-full bg-gray-100 p-6" />
                <div className="rounded-full bg-gray-100 p-6" />
            </ul>
        </div>
    );
}

export default NoteSkeleton;