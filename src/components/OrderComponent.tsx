import { useAuth } from "@/context/AuthContext";
import useProducts from "@/hooks/productsHook";
import { ProductInOrder } from "@/types/ProductInOrder";
import axios from "axios";
import { useEffect, useState } from "react";

interface ConfirmedProducts {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

const OrderComponent = () => {
  const { isLoading, isLoggedIn, orderIds, setOrderIds, user } = useAuth();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useProducts();
  const [orderProducts, setOrderProducts] = useState<ProductInOrder[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const [productsConfirmed, setProductsConfirmed] = useState<
    ConfirmedProducts[]
  >([]);

  const [customerInfo, setCustomerInfo] = useState<{
    phone: string;
    name: string;
  }>({
    phone: "",
    name: "",
  });

  useEffect(() => {
    setProductsConfirmed([]);

    let allProductsInOrder: ProductInOrder[] = [];
    if (products && orderIds.length > 0) {
      orderIds.forEach((order) => {
        const currentProduct = products.find(
          (product) => product._id === order.id
        );
        if (currentProduct) {
          allProductsInOrder.push({
            item: currentProduct,
            count: order.count,
          });
        }
      });

      setOrderProducts(allProductsInOrder);
    }
  }, [products, orderIds]); // Include both products and orderIds in the dependency array // Include both products and orderIds in the dependency array// Include both products and orderIds in the dependency array

  useEffect(() => {
    computeTotals();
  }, [orderProducts]);

  const computeTotals = () => {
    if (orderProducts.length > 0) {
      let total = 0;

      orderProducts.forEach((product) => {
        const amount = product.item.price * product.count;
        total += amount;
      });

      setOrderTotal(total);
    }
  };

  const increaseCount = (productId: string) => {
    setProductsConfirmed([]);
    setOrderIds((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decreaseCount = (productId: string) => {
    setProductsConfirmed([]);

    setOrderIds((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          if (item.count === 1) {
            console.log("Cannot reduce below 1");
            return item;
          }
          return { ...item, count: item.count - 1 };
        }
        return item;
      })
    );
  };
  const removeProduct = (productId: string) => {
    setProductsConfirmed([]);

    setOrderIds((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearOrder = () => {
    setProductsConfirmed([]);

    setOrderIds([]);
  };

  const confirmProducts = () => {
    let toSave: ConfirmedProducts[] = [];

    if (orderProducts.length < 1) {
      console.log("You have not added products to confirm");
      return;
    }

    orderProducts.forEach((product) => {
      const current: ConfirmedProducts = {
        productId: product.item._id,
        productName: product.item.name,
        quantity: product.count,
        unitPrice: product.item.price,
      };

      toSave.push(current);
    });

    setProductsConfirmed(toSave);
  };

  const processOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("We want to process order now");

    // Convert phone to a number
    const phoneAsNumber = customerInfo.phone
      ? parseInt(customerInfo.phone, 10)
      : null;

    if (!phoneAsNumber || isNaN(phoneAsNumber)) {
      console.log("Invalid phone number");
      return;
    }

    const finalCustomerInfo = {
      ...customerInfo,
      phone: phoneAsNumber, // Ensure phone is submitted as a number
    };

    console.log("Customer: ", finalCustomerInfo);
    console.log("Products: ", productsConfirmed);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/submitOrder`,
        {
          products: productsConfirmed,
          seller: {
            id: user._id,
            name: user.name,
          },
          customer: finalCustomerInfo,
        }
      );

      console.log("Order created successfully: ", response.data);
      setProductsConfirmed([]);
      setOrderIds([]);
      setCustomerInfo({ phone: "", name: "" });
    } catch (error) {
      console.log("There was  error in creating order: ", error);
    }
  };

  const handleCustomerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setCustomerInfo((previousState) => ({
      ...previousState,
      [name]: value,
    }));
  };

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
  if (orderIds.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>You have not selected any products yet.</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Failed to load products.</p>
      </div>
    );
  }
  if (productsLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Order Summary</h1>
      <div className="mt-4">
        {orderProducts.map((product) => (
          <div key={product.item._id} className="mb-4">
            <h2 className="text-xl">{product.item.name}</h2>
            <p>Count: {product.count}</p>
            <p>Price: Ksh. {product.item.price}</p>
            <p>Total: Ksh. {product.count * product.item.price}</p>
            <button onClick={() => increaseCount(product.item._id)}>ADD</button>
            <button onClick={() => decreaseCount(product.item._id)}>
              reduce
            </button>
            <button onClick={() => removeProduct(product.item._id)}>
              remove
            </button>
          </div>
        ))}
      </div>

      <p>Totals: {orderTotal}</p>
      {productsConfirmed.length > 0 ? (
        <div>
          <form action="" onSubmit={processOrder}>
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                required
                value={customerInfo.phone}
                pattern="^(07|01)[0-9]{8}$"
                title="Phone number must start with '07' or '01' and be 10 digits long"
                className="border px-2 py-1 rounded"
                onChange={handleCustomerInput}
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={customerInfo.name}
                required
                className="border px-2 py-1 rounded"
                onChange={handleCustomerInput}
              />
            </div>
            <input
              type="submit"
              name="submit"
              value={`Process Order Now`}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            />
          </form>
        </div>
      ) : (
        <button onClick={confirmProducts}>Confirm Item(s)</button>
      )}
      <button onClick={clearOrder}>Clear order</button>
    </div>
  );
};

export default OrderComponent;
