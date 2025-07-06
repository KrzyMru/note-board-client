import NavigationBar from "./components/navigation-bar";
import MainBanner from "./components/main-banner";

const Layout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#fdfdfc] via-[#fef6e6] to-[#fbead1] md:p-10">
      <div className="h-full w-full flex flex-col rounded-none shadow-xl bg-white overflow-auto md:flex-row md:rounded-xl">

        <div className="flex flex-row space-x-6 md:flex-col">
          <div className="mr-5 ml-5 mt-5 mb-10 mr-15 hidden md:block">
            <MainBanner />
          </div>
          <div className="mb-4 pl-10 hidden md:block">
            <p className="text-base font-semibold antialiased line-clamp-1 text-gray-300">Menu</p> 
          </div>       
          <NavigationBar />
        </div>

        {children}
      </div>
    </div>
  );
}

export default Layout;
