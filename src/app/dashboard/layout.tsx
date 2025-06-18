const DashboardLayout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[#e0d3c3]">
      {children}
    </div>
  );
}

export default DashboardLayout;
