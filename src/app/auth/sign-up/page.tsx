import Link from "next/link";
import SignUpForm from "./components/sign-up-form";

const SignUp = () => {
  return (
    <div className="flex flex-col items-center">
      <SignUpForm />
      <div className="flex flex-wrap gap-x-1 mt-2">
        <p className="text-xs text-[#ece5db] antialiased">Already have an account?</p>
        <Link 
          href={"/auth/sign-in"}
          className="text-xs text-[#927c6a] antialiased hover:text-[#6e5d4f] focus-visible:outline-2"
          title="Go to sign in page"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;