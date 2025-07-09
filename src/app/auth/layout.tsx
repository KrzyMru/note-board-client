import Image from "next/image";
import NotePad from "../../../public/note-pad.svg";

const Layout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-[#fdfdfc] via-[#fef6e6] to-[#fbead1]">
      <div className="bg-white p-6 flex flex-col rounded-xl shadow-xl w-full h-full xs:max-w-80 xs:h-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-slate-300 p-3 mb-3 rounded-full shadow-md outline-1 outline-dashed outline-white">
            <Image 
              src={NotePad}
              alt="Notepad logo"
              className="size-[32px]"
            />
          </div>
          <p className="text-2xl text-slate-400 line-clamp-1 antialiased">Note Board</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Layout;