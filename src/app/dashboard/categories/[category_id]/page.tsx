import CategoryContent from "./components/category-content";

const Page = async ({ params }: { params: Promise<{ category_id: number }> }) => {
    const { category_id } = await params;

    return <CategoryContent categoryId={category_id} />;
}

export default Page;