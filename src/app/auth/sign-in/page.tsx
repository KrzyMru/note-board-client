import Link from "next/link";
import SignInForm from "./components/sign-in-form";

const SignIn = () => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <SignInForm />
      <div className="flex flex-wrap gap-x-1 mt-2">
        <p className="text-xs text-gray-400 antialiased">{"Don't have an account?"}</p>
        <Link 
          href={"/auth/sign-up"}
          className="text-xs text-slate-500 antialiased hover:text-slate-400 outline-slate-500 focus-visible:outline-2"
          title="Go to sign up page"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SignIn;