import "~/styles/globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "podmod.app",
  description: "Modify any podcast feed with custom filters, artwork, titles, and more!",
  icons: {
    icon: { rel: "icon", url: "/favicon.ico" },
    apple: { rel: "icon", url: "/apple-touch-icon.png" },
  },
};

export const viewport: Viewport = {
  themeColor: "#00A6FB",
};

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang="en" className="tiny:text-tiny mobile:text-mobile normal:text-normal text-base">
      <body className="bg-podmod dark:bg-podmod-dark">
        <main className="bg-white text-neutral-800 dark:bg-neutral-900 dark:text-white">
          {children}
        </main>
      </body>
    </html>
  );
};

export default Layout;
