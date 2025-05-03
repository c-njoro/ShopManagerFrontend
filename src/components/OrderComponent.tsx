import { useAuth } from "@/context/AuthContext";
import useProducts from "@/hooks/productsHook";
import { ProductInOrder } from "@/types/ProductInOrder";
import axios from "axios";
import { CheckCheck, Minus, Plus, Trash2, X } from "lucide-react";
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

      console.log("Order created successfully: Initiating stock update");

      updateStock();
      console.log("Stock updated successfully");
      refetchProducts();

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

  const updateStock = async () => {
    try {
      orderProducts.forEach(async (product) => {
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_FRONTEND_URL}/api/updateStock`,
          {
            productId: product.item._id,
            newStock: product.item.quantity - product.count,
          }
        );
      });

      refetchProducts();
    } catch (error) {
      console.log(
        "Error updating stock of products during order submission. ",
        error
      );
    }
  };

  if (isLoading) {
    return (
      <div className="w-full md:h-screen h-[calc(90vh)] flex flex-col justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!isLoggedIn) {
    return (
      <div className="w-full md:h-screen h-[calc(90vh)] flex flex-col justify-center items-center">
        <p>You are not logged in, log in to the system first.</p>
      </div>
    );
  }
  if (orderIds.length === 0) {
    return (
      <div className="w-full md:h-screen h-[calc(90vh)] flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-center items-center h-max card p-2 ">
          <h1 className="uppercase font-semibold text-xl tracking-widest">
            Order In Making
          </h1>
        </div>

        <p className="mt-8">You have not selected any products.</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="w-full md:h-screen h-[calc(90vh)] flex flex-col justify-center items-center">
        <p>Failed to load products.</p>
      </div>
    );
  }
  if (productsLoading) {
    return (
      <div className="w-full md:h-screen h-[calc(90vh)] flex flex-col justify-center items-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-max flex flex-col justify-start items-center">
      <div className="w-full flex flex-col justify-center items-center h-max card p-2 ">
        <h1 className="uppercase font-semibold text-xl tracking-widest">
          Order In Making
        </h1>
      </div>
      <div className=" w-full h-max flex flex-col justify-start items-start p-2 gap-3">
        {orderProducts.map((product) => (
          <div
            key={product.item._id}
            className="card w-full h-max flex flex-col justify-start items-start rounded-md p-2 gap-2"
          >
            <h2 className="font-semibold text-sm tracking-wider">
              {product.item.name}
            </h2>
            <div className="w-full h-max flex flex-row justify-between items-center">
              <p className="text-sm font-extralight tracking-wider">
                @Ksh. {product.item.price}
              </p>
              <p className="text-sm font-extralight tracking-wider">
                Total: Ksh {product.count * product.item.price}
              </p>
            </div>

            <div className="w-full h-max flex flex-row justify-between items-center ">
              <div className="w-max grid grid-cols-3 place-items-center gap-4">
                <button
                  onClick={() => decreaseCount(product.item._id)}
                  className="p-1 border-orange-800 border rounded-full"
                >
                  <Minus className="text-orange-500 w-4 h-4" />
                </button>
                <p className="p-1 px-3 header rounded-md shadow-md">
                  {product.count}
                </p>
                <button
                  onClick={() => increaseCount(product.item._id)}
                  className="p-1 border-green-800 border rounded-full"
                >
                  <Plus className="text-green-500 w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeProduct(product.item._id)}
                className="w-max flex flex-row justify-center items-center gap-2 p-1 px-3"
              >
                <Trash2 className="text-red-500 w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-max flex flex-row justify-end items-center p-2">
        <p className="tracking-widest font-semibold text-sm text-green-600">
          Order Totals: Ksh {orderTotal}
        </p>
      </div>

      {productsConfirmed.length > 0 ? (
        <div className="w-full h-max p-2">
          <form
            action=""
            onSubmit={processOrder}
            className="w-full h-max flex flex-col justify-start items-start gap-2 p-2  rounded-md"
          >
            <h1 className="w-full h-max p-2 flex flex-row justify-center items-center text-xl">
              Customer Info
            </h1>
            <div className="w-full h-max">
              <input
                type="text"
                name="phone"
                id="phone"
                required
                value={customerInfo.phone}
                pattern="^(07|01)[0-9]{8}$"
                title="Phone number must start with '07' or '01' and be 10 digits long"
                className="input-field col-span-3 w-full h-max py-2 px-3 rounded-full text-sm"
                placeholder="Enter Customer Phone Number"
                onChange={handleCustomerInput}
              />
            </div>
            <div className="w-full h-max">
              <input
                className="input-field col-span-3 w-full h-max py-2 px-3 rounded-full text-sm"
                placeholder="Enter Customer Name"
                type="text"
                name="name"
                id="name"
                value={customerInfo.name}
                required
                onChange={handleCustomerInput}
              />
            </div>
            <input
              type="submit"
              name="submit"
              value={`Process Order Now`}
              className="bg-blue-500 text-white px-4 py-2 w-full h-max rounded-full shadow-lg"
            />
          </form>
        </div>
      ) : (
        <button
          onClick={confirmProducts}
          className="w-4/5 h-max py-2 flex flex-row justify-center items-center gap-4 p-1 px-3 bg-blue-500 rounded-full mt-3 text-white"
        >
          <CheckCheck className="h-6 w-6" />
          <p className="text-sm uppercase tracking-wider">Confirm Items</p>
        </button>
      )}

      <button
        onClick={clearOrder}
        className="w-4/5 h-max py-2 flex flex-row justify-center items-center gap-4 p-1 px-3 bg-red-600 rounded-full mt-3 text-white"
      >
        <X className="h-6 w-6" />
        <p className="text-sm uppercase tracking-wider">Cancel Order</p>
      </button>
    </div>
  );
};
// Export the component as default
export default OrderComponent;
