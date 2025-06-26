import { redirect } from "next/navigation";

const Home = () => {
  redirect("/dashboard/notes");
}

export default Home;