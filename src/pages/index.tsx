import ThemeToggle from "@/components/ThemeToggle";

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="font-bold text-3xl">Main Page</h1>
      <ThemeToggle />

      <div className="card w-1/2 h-1/2">
        <h2>Card</h2>
      </div>
    </div>
  );
};

export default MainPage;
