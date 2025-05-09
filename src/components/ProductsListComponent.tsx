import { useAuth } from "@/context/AuthContext";
import useProducts from "@/hooks/productsHook";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ProductListComponent = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const { orderIds, setOrderIds } = useAuth();

  useEffect(() => {
    if (products) {
      setProductsData(products);
    }
  }, [products]);

  //filtration variables
  const searchedName = useRef<HTMLInputElement>(null);
  const searchedCategory = useRef<HTMLSelectElement>(null);
  const [message, setMessage] = useState<string>("");

  const clearSearch = () => {
    const message = document.getElementById("message");
    searchedName.current!.value = "";
    searchedCategory.current!.value = "";
    setProductsData(products || []);
    setMessage("");
    message!.classList.add("hide");
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
      message!.classList.add("hide");
    } else {
      const filterMessage = `
      Cannot find items matching the provided filters:
      ${categoryTerm ? `Category: "${categoryTerm}" ` : ""}
      ${nameTerm ? `Name: "${nameTerm}" ` : ""}
    `;
      setMessage(filterMessage.trim());
      message?.classList.remove("hide");
      setProductsData(products || []);
    }
  };

  const addToOrder = (productId: string) => {
    const exists = orderIds.find((id) => id.id === productId);
    if (exists) {
      console.log("Product already in order");
      return;
    }

    setOrderIds((prev) => [...prev, { id: productId, count: 1 }]);
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
          Products
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
      <div className="w-full h-max p-2 flex flex-wor jstify-cnter items-center">
        <p
          id="message"
          className="message text-sm hide text-red-500 tracking-wide"
        >
          {message}
        </p>
      </div>

      {products ? (
        productsData.length > 0 ? (
          <div className="w-full h-max grid grid-cols-2 lg:grid-cols-3 p-3 gap-4">
            {productsData.map((product: Product) => (
              <div
                key={product._id}
                className="overflow-hidden w-full h-max flex flex-col justify-start items-start  rounded-lg shadow-md card relative"
              >
                <div className="w-full h-1/2  flex flex-col justify-start items-center">
                  <Image
                    src={`/images/samsung.jpg`}
                    alt="product image"
                    width={600}
                    height={600}
                    className="w-full max-h-24 h-full object-cover"
                  ></Image>
                </div>

                <div className="w-full h-max flex flex-col justify-start items-start gap-2 p-2">
                  <h1 className="text-xs font-bold tracking-widest">
                    {product.name}
                  </h1>

                  <p className="text-xs font-extralight  tracking-widest">
                    In Stock: {product.quantity}
                  </p>

                  {product.size && (
                    <p className="text-xs font-extralight  tracking-widest">
                      Size: {product.size}
                    </p>
                  )}

                  {product.color && (
                    <p className="text-xs font-extralight  tracking-widest">
                      Color: {product.color}
                    </p>
                  )}
                  <button
                    onClick={() => addToOrder(product._id)}
                    className="input-field w-full h-max flex flex-col justify-center items-center text-xs uppercase tracking-widest py-1 rounded-full cursor-pointer"
                  >
                    Add to Order
                  </button>
                </div>

                <p className="absolute top-2 left-2 py-1 px-2 text-sm rounded-full card">
                  Ksh. {product.price}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1>
              Products searched not available or products not properly fetched
              from database!!
            </h1>
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

export default ProductListComponent;
