import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const MainPage = () => {
  const { isLoading, isLoggedIn, user, logout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="font-bold text-3xl">Main Page</h1>
      <ThemeToggle />

      <div className="card w-1/2 h-1/2 flex flex-col justify-center items-center gap-8">
        <h2>Card</h2>

        {isLoading && <p className="text-gray-500">Loading...</p>}

        {isLoggedIn ? (
          <div>
            <p className="text-green-500">Welcome, {user?.name}!</p>
            <Link href="/dashboard">Go to dashboard</Link>
            <button onClick={logout}>Log out</button>
          </div>
        ) : (
          <div>
            <p className="text-red-500">You are not logged in.</p>
            <Link href="/login">Go to login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
