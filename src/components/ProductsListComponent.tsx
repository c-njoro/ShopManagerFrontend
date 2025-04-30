import useProducts from "@/hooks/productsHook";
import { Product } from "@/types/Product";
import { useEffect, useRef, useState } from "react";

const ProductListComponent = () => {
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const [productsData, setProductsData] = useState<Product[]>([]);

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
      Cannot find properties matching the provided filters:
      ${categoryTerm ? `Category: "${categoryTerm}" ` : ""}
      ${nameTerm ? `Name: "${nameTerm}" ` : ""}
       }
    `;
      setMessage(filterMessage.trim());
      message?.classList.remove("hide");
      setProductsData(products || []);
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
    <div>
      <h1>Make new order page</h1>

      <div className="filter-form">
        <input
          placeholder="search by name.."
          type="text"
          id="name"
          ref={searchedName}
          onChange={handleInputChange}
          className="w-full h-10 pl-5 rounded-full bg-input text-foreground font-body font-extralight tracking-wide text-sm sm:text-base"
        />

        <select
          ref={searchedCategory}
          id="category"
          onChange={handleInputChange}
          className="border px-2 py-1 rounded"
        >
          <option value="">All Categories</option>
          <option value="Utensil">Utensil</option>
          <option value="Plastic">Plastic</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoe">Shoe</option>
          <option value="Stationery">Stationery</option>
          <option value="Other">Other</option>
        </select>

        <p id="message" className="message hide text-red-500 uppercase">
          {message}
        </p>

        <button
          onClick={clearSearch}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>

      {products ? (
        productsData.length > 0 ? (
          <div>
            {productsData.map((product: Product) => (
              <div
                key={product._id}
                className="flex flex-col justify-center items-center"
              >
                <h1>{product.name}</h1>
                <p>{product.category}</p>
                <p>{product.price}</p>
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
