import UpdateCategoryForm from "./components/update-category-form";

const Page = async ({ params }: { params: Promise<{ category_id: number }> }) => {
    const { category_id } = await params;

    return (
        <div className="flex-1 flex justify-center">
            <div className="flex-1 flex flex-col pb-8 max-w-xl">
                <div className="mx-10 mt-8 mb-10">
                    <p className="text-center text-4xl text-gray-900 antialiased">Update your category</p>
                </div>
                <UpdateCategoryForm categoryId={category_id} />
            </div>
        </div>
    );
}

export default Page;