import LeftSidebar from "@/components/shared/navbar/LeftSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1  flex-col overflow-y-auto px-4 pb-24 pt-28 max-md:pb-14 sm:px-14 ">
          <div className="mx-auto w-full ">{children}</div>
        </section>
        {/* <RightSidebar /> */}
      </div>
      <Toaster />
    </main>
  );
};

export default Layout;
