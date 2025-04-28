import { ReactNode } from "react";
import Header from "./Header";

interface StructureProps {
  children: ReactNode;
}

const Structure = ({ children }: StructureProps) => {
  return (
    <div className="w-screen min-h-screen relative overflow-hidden h-max border-b border-gray-200">
      <div className="fixed top-0 left-0 z-50 sm:bg-transparent ">
        <Header />
      </div>
      <div className="w-full pt-[calc(7vh)]">{children}</div>
    </div>
  );
};

export default Structure;
