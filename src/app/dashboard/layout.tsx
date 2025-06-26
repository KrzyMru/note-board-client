import NavigationBar from "./components/navigation-bar";
import MainBanner from "./components/main-banner";

const DashboardLayout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="h-screen w-screen bg-gradient-to-br from-[#fdfdfc] via-[#fef6e6] to-[#fbead1] p-10">
      <div className="h-full w-full flex rounded-xl shadow-xl bg-white overflow-hidden">

        <div className="flex flex-col">
          <MainBanner />
          <p className="text-base font-semibold antialiased line-clamp-1 text-gray-300 mb-4 pl-10">Menu</p>        
          <NavigationBar />
        </div>

        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
