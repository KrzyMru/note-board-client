import Image from "next/image";
import NotePad from "../../../public/note-pad.svg";

const AuthLayout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#e0d3c3]">
      <div className="bg-[#c5af9d] p-6 rounded-xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#9e8c7e] p-3 mb-3 rounded-full shadow-md outline-1 outline-dashed outline-white">
            <Image 
              src={NotePad}
              alt="Notepad logo"
              className="size-[32px]"
            />
          </div>
          <p className="text-2xl text-white line-clamp-1 antialiased">Note Board</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;