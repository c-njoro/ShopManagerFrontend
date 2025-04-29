import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const AdminPanel = dynamic(
  () => import("../../components/adminComponents/AdminPanel"),
  {
    ssr: false,
  }
);

const AdminPage = () => {
  const router = useRouter();
  const { isLoading, isLoggedIn, user } = useAuth();

  if (isLoading) {
    return (
      <div className="w-screen min-h-[calc(90vh)] flex flex-col justify-center items-center">
        <h1 className="text-3xl uppercase text-red-500 font-body font-bold">
          Loading...
        </h1>
      </div>
    );
  }
  // Check if user is logged in and has admin role

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-8">
        <h1 className="text-3xl uppercase text-red-500 font-body font-bold tracking-widest">
          Not logged in the System
        </h1>
        <button
          onClick={() => router.push("/login")}
          className="w-max h-max font-body text-base  input-field shadow-lg px-10 py-2 rounded-full"
        >
          Log In
        </button>
      </div>
    );
  }

  if (user.role == "admin") {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <h1 className="text-7xl uppercase text-red-500 font-body font-bold tracking-widest">
          !!! Not Unauthorized !!!
        </h1>
      </div>
    );
  }
  return <AdminPanel />;
};

export default AdminPage;
