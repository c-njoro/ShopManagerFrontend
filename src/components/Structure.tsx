import { ReactNode } from "react";
import Header from "./Header";

interface StructureProps {
  children: ReactNode;
}

const Structure = ({ children }: StructureProps) => {
  return (
    <div className="w-screen min-h-screen  overflow-hidden md:grid md:grid-cols-12 flex flex-col">
      <div className=" col-span-3 lg:col-span-2 h-full w-full fixed md:relative z-10">
        <Header />
      </div>
      <div className="w-full pt-[calc(10vh)] md:pt-0 col-span-9 lg:col-span-10">
        {children}
      </div>
    </div>
  );
};

export default Structure;
