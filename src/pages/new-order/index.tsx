import useProducts from "@/hooks/productsHook";

const NewOrder = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useProducts();

  if (productsLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Loading products...</h1>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <h1>Error loading products</h1>
        <button>Fetch again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Make new order page</h1>

      {products?.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
};

export default NewOrder;
