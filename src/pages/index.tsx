import ProductSearchComponent from "@/components/ProductsSearchComponent";
import { useAuth } from "@/context/AuthContext";

const MainPage = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-max">
      <ProductSearchComponent />
    </div>
  );
};

export default MainPage;
