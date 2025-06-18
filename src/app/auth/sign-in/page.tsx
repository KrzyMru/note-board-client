import Link from "next/link";
import SignInForm from "./components/sign-in-form";

const SignIn = () => {
  return (
    <div className="flex flex-col items-center">
      <SignInForm />
      <div className="flex flex-wrap gap-x-1 mt-2">
        <p className="text-xs text-[#ece5db] antialiased">Don't have an account?</p>
        <Link 
          href={"/auth/sign-up"}
          className="text-xs text-[#927c6a] antialiased hover:text-[#6e5d4f] focus-visible:outline-2"
          title="Go to sign up page"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default SignIn;