import useProducts from "@/hooks/productsHook";
import { Product } from "@/types/Product";
import { useRef, useState } from "react";

const ProductSearchComponent = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const [productsData, setProductsData] = useState<Product[]>([]);

  //filtration variables
  const searchedName = useRef<HTMLInputElement>(null);
  const searchedCategory = useRef<HTMLSelectElement>(null);
  const [message, setMessage] = useState<string>("");

  const clearSearch = () => {
    const message = document.getElementById("message");
    searchedName.current!.value = "";
    searchedCategory.current!.value = "";
    setProductsData([]);
    setMessage("");
  };

  const handleInputChange = () => {
    const message = document.getElementById("message");
    const nameTerm = searchedName.current?.value.toLowerCase() || "";
    const categoryTerm = searchedCategory.current?.value || "";

    if (!nameTerm && !categoryTerm) {
      clearSearch();
      return;
    }
    const filtered = products?.filter((product: Product) => {
      const matchesCategory = categoryTerm
        ? product.category === categoryTerm
        : true;
      const matchesName = nameTerm
        ? product.name.toLowerCase().includes(nameTerm)
        : true;

      return matchesCategory && matchesName;
    });

    if (filtered && filtered.length > 0) {
      setProductsData(filtered);
    } else {
      const filterMessage = `
      Cannot find items matching the provided filters:
      ${categoryTerm ? `Category: "${categoryTerm}" ` : ""}
      ${nameTerm ? `Name: "${nameTerm}" ` : ""}
    `;
      setMessage(filterMessage.trim());
      message?.classList.remove("hide");
      setProductsData([]);
    }
  };

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
    <div className="w-full min-h-full overflow-y-auto scroll-auto flex flex-col justify-start items-start relative">
      <div className="w-full flex flex-col justify-center items-center h-max card p-2 ">
        <h1 className="uppercase font-semibold text-xl tracking-widest">
          Home Page
        </h1>
      </div>

      <div className="filter-form w-full h-max grid grid-cols-5 gap-2 p-2">
        <select
          ref={searchedCategory}
          id="category"
          onChange={handleInputChange}
          className="input-field border px-2 py-3 col-span-2 rounded-md text-sm"
        >
          <option value="">All Categories</option>
          <option value="Utensil">Utensil</option>
          <option value="Plastic">Plastic</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoe">Shoe</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

        <input
          placeholder="Search by name.."
          type="text"
          id="name"
          ref={searchedName}
          onChange={handleInputChange}
          className="input-field col-span-2 w-full rounded-md shadow-md px-2 text-sm"
        />

        <button
          onClick={clearSearch}
          className="bg-red-700  px-4 py-2 rounded text-sm"
        >
          Clear Filters
        </button>
      </div>

      {products ? (
        productsData.length > 0 ? (
          <div className="w-full h-max flex flex-col justify-start items-start p-4">
            <div className="w-full h-max grid grid-cols-3 place-items-center border-2 divide-x-2 divide-gray-500 border-gray-500">
              <p className=" flex flex-row justify-center items-center w-full h-max text-xl font-semibold tracking-widest">
                Item
              </p>
              <p className="flex flex-row justify-center items-center  w-full h-max text-xl font-semibold tracking-widest">
                Stock
              </p>
              <p className="flex flex-row justify-center items-center  w-full h-max text-xl font-semibold tracking-widest">
                Price
              </p>
            </div>
            {productsData.map((product: Product) => (
              <div
                className="w-full h-max grid grid-cols-3 place-items-center p-3"
                key={product._id}
              >
                <p className="w-full h-max flex flex-row justify-center items-center   tracking-widest">
                  {product.name}
                </p>
                <p className="w-full h-max flex flex-row justify-center items-center  tracking-widest">
                  {product.quantity}
                </p>
                <p className="w-full h-max flex flex-row justify-center items-center  tracking-widest">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center min-h-[calc(50vh)]">
            {searchedName.current?.value == null &&
            searchedCategory.current?.value == null ? (
              <p>Enter Search terms to check availability of products</p>
            ) : searchedName.current?.value == "" &&
              searchedCategory.current?.value == "" ? (
              <p>Enter Search terms to check availability of products</p>
            ) : (
              <div>
                <p id="message" className="message text-red-500 tracking-wide">
                  {message}
                </p>
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <h1>No products available</h1>
        </div>
      )}
    </div>
  );
};

export default ProductSearchComponent;
