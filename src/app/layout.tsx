import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Note Board",
  icons: "/note-pad.svg",
};

const RootLayout = ({ children, }: Readonly<{children: React.ReactNode;}>) => {
  return (
    <html lang="en">
      <body>
          {children}
          <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

export default RootLayout;