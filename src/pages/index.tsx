import { useAuth } from "@/context/AuthContext";

const MainPage = () => {
  const { isLoading, isLoggedIn, user, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-max min-h-[calc(93vh)] ">
      <h1 className="font-bold text-3xl">Main Page</h1>
    </div>
  );
};

export default MainPage;
