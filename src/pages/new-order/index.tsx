import OrderComponent from "@/components/OrderComponent";
import ProductListComponent from "@/components/ProductsListComponent";
import { useAuth } from "@/context/AuthContext";

const NewOrderPage = () => {
  const { isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>You are not logged in, log in to the system first.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen grid md:grid-cols-3 grid-cols-2">
      <div className="md:col-span-2 w-full overflow-y-scroll scroll-smooth thin-scrollbar">
        <ProductListComponent />
      </div>
      <div className="col-span-1 w-full h-full">
        <OrderComponent />
      </div>
    </div>
  );
};

export default NewOrderPage;
