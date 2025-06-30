const Layout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
    return (
        <div className="flex-1 flex px-4">
            {children}
        </div>
    );
}

export default Layout;