const NoteError = ({ status } : { status: number }) => {
    return (
        <div className="flex-1 flex flex-col justify-between pb-8">
            <div>
                <div className="mt-8">
                    <h2 className="text-center text-4xl text-gray-900 antialiased">Something went wrong!</h2>
                </div>
                <div className="mt-5">
                    <h2 className="text-xl text-gray-900 font-semibold antialiased">Error code</h2>
                </div>
                <div className="mt-1">
                    <h2 className="text-base text-gray-500 antialiased">{status}</h2>
                </div>
                <div className="mt-3">
                    <h2 className="text-xl text-gray-900 font-semibold antialiased">Reason</h2>
                </div>
                <div className="mt-1">
                    <h2 className="text-base text-gray-500 antialiased">{}</h2>
                </div>
            </div>
        </div>
    );
}

export default NoteError;