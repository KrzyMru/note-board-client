import NewCategoryForm from "./components/new-category-form";

const Page = () => {

    return (
        <div className="flex-1 flex justify-center">
            <div className="flex-1 flex flex-col pb-8 max-w-2xl">
                <div className="mx-10 mt-8 mb-10">
                    <p className="text-center text-4xl text-gray-900 antialiased">Create a new category</p>
                </div>
                <NewCategoryForm />
            </div>
        </div>
    );
}

export default Page;