import useOrders from "@/hooks/ordersHook";
import { Order } from "@/types/Order";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const OrdersViewComponent = () => {
  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useOrders();

  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [orderInDisplay, setOrderInDisplay] = useState<Order>();

  useEffect(() => {
    if (orders) {
      setOrdersData(orders);
      setOrderInDisplay(orders[0]);
    }
  }, [orders]);

  //filters terms
  const searchedSeller = useRef<HTMLInputElement>(null);
  const searchedCustomer = useRef<HTMLInputElement>(null);
  const selectedTimeRange = useRef<HTMLSelectElement>(null);

  //handle input of filters
  const handleFilterOrders = () => {
    const sellerTerm = searchedSeller.current?.value.toLowerCase() || "";
    const customerTerm = searchedCustomer.current?.value.toLowerCase() || "";
    const timeFilter = selectedTimeRange.current?.value;

    const now = new Date();

    const filtered = orders?.filter((order: Order) => {
      const matchesSeller = sellerTerm
        ? order.seller.name.toLowerCase().includes(sellerTerm)
        : true;

      const matchesCustomer = customerTerm
        ? order.customer.name.toLowerCase().includes(customerTerm)
        : true;

      const orderDate = new Date(order.orderedAt);
      let matchesTime = true;

      if (timeFilter === "today") {
        matchesTime = orderDate.toDateString() === now.toDateString();
      } else if (timeFilter === "past3") {
        const diffTime = now.getTime() - orderDate.getTime();
        matchesTime = diffTime <= 3 * 24 * 60 * 60 * 1000;
      } else if (timeFilter === "past7") {
        const diffTime = now.getTime() - orderDate.getTime();
        matchesTime = diffTime <= 7 * 24 * 60 * 60 * 1000;
      } else if (timeFilter === "month") {
        matchesTime =
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear();
      }

      return matchesSeller && matchesCustomer && matchesTime;
    });

    setOrdersData(filtered || []);
  };

  const clearFilters = () => {
    searchedSeller.current!.value = "";
    searchedCustomer.current!.value = "";
    selectedTimeRange.current!.value = "";
    setOrdersData(orders || []);
  };

  if (ordersLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (ordersError) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>There was an error fetching orders.</h1>
      </div>
    );
  }

  return (
    <div className="w-full md:h-screen h-[calc(90vh)] pb-3">
      <div className="w-full flex flex-row justify-between items-center h-max card p-2 ">
        <h1 className="uppercase font-semibold text-xl tracking-widest">
          Orders
        </h1>

        <Link
          href="/manager/main-management"
          className="direction  flex flex-row gap-4 items-center  px-2 rounded-sm transition-all"
        >
          <Settings className="h-5 w-5" />
          <p>Main Management</p>
        </Link>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full h-max grid grid-cols-4 gap-3 mt-1 px-2"
      >
        <input
          ref={searchedSeller}
          onChange={handleFilterOrders}
          type="text"
          placeholder="Search by Seller Name"
          className="input-field w-full h-max pl-3 rounded-md py-1"
        />

        <input
          ref={searchedCustomer}
          onChange={handleFilterOrders}
          type="text"
          placeholder="Search by Customer Name"
          className="input-field w-full h-max pl-3 rounded-md py-1"
        />

        <select
          ref={selectedTimeRange}
          className="input-field w-full h-max py-2 px-3 rounded-md"
          defaultValue=""
          onChange={handleFilterOrders}
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="past3">Past 3 Days</option>
          <option value="past7">Past 7 Days</option>
          <option value="month">This Month</option>
        </select>

        <button
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </form>

      <div className="w-full h-full grid grid-cols-2 ">
        <div className="w-full md:h-[calc(88vh)] h-[calc(70vh)]  p-3 overflow-y-scroll scroll-smooth scrollbar-none">
          {ordersData.length > 0 ? (
            <div className="w-full h-full  flex flex-col justify-start items-start gap-3 ">
              <div className="w-full h-max grid grid-cols-4  card p-3">
                <p className="font-bold  tracking-widest">Date</p>
                <p className="font-bold  tracking-widest">Seller</p>
                <p className="font-bold  tracking-widest">Amount</p>
                <p className="font-bold  tracking-widest">Customer</p>
              </div>
              {ordersData.map((order: Order) => (
                <div
                  key={order._id}
                  className={`${
                    order._id == orderInDisplay?._id ? "input-field" : ""
                  } w-full h-max grid grid-cols-4 p-3`}
                  onClick={() => {
                    setOrderInDisplay(order);
                  }}
                >
                  <p className="font-thin tracking-wider text-sm">
                    {new Date(order.orderedAt).toLocaleDateString("en-CA")}
                  </p>
                  <p className="font-thin tracking-wider text-sm">
                    {order.seller.name}
                  </p>
                  <p className="font-thin tracking-wider text-sm">
                    {order.totalAmount.toString()}
                  </p>
                  <p className="font-thin tracking-wider text-sm">
                    {order.customer?.name}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <h1>No matching orders</h1>
          )}
        </div>

        <div className="w-full h-full  ">
          <div className="w-full flex flex-col justify-start items-center p-4 gap-8">
            {orderInDisplay ? (
              <div className="card w-full md:h-[calc(85vh)] h-[calc(70vh)] p-3 rounded-lg shadow-lg flex flex-col justify-start items-start gap-8 overflow-y-scroll scroll-smooth scrollbar-none">
                <p className="opacity-30">ID: {orderInDisplay._id}</p>

                <div className="w-full grid grid-cols-2  mt-3 text-sm">
                  <p className=" tracking-widest">Sold By: </p>
                  <p className="font-bold tracking-widest">
                    {orderInDisplay.seller.name}
                  </p>
                </div>

                <div className="w-full grid grid-cols-2  mt-3 text-sm">
                  <p className=" tracking-widest">Sold To: </p>
                  <p className="font-bold tracking-widest">
                    {orderInDisplay.customer?.name}
                  </p>
                </div>

                <div className="w-full grid grid-cols-2  mt-3 text-sm">
                  <p className="tracking-widest">Phone: </p>
                  <p className="font-bold tracking-widest">
                    0{orderInDisplay.customer?.phone.toString()}
                  </p>
                </div>

                <div className="w-full grid grid-cols-2  mt-3 text-sm">
                  <p className=" tracking-widest">Order Date: </p>
                  <p className="font-bold tracking-widest">
                    {new Date(orderInDisplay.orderedAt).toLocaleDateString(
                      "en-CA"
                    )}
                  </p>
                </div>

                <div className="w-full flex flex-col justify-start items-start mt-2 gap-3">
                  <div className="w-full grid grid-cols-3 ">
                    <p className="font-bold tracking-widest ">Item</p>
                    <p className="font-bold tracking-widest ">Price</p>
                    <p className="font-bold tracking-widest ">Total</p>
                  </div>

                  {orderInDisplay.products.map((product) => (
                    <div className="w-full grid grid-cols-3 ">
                      <p className="text-sm tracking-widest">{`X${product.quantity}-${product.productName}`}</p>
                      <p className="text-sm tracking-widest">
                        @ {product.unitPrice.toString()}
                      </p>
                      <p className="text-sm tracking-widest">
                        KES {product.totalPrice.toString()}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="w-full grid grid-cols-2 place-items-center mt-3 border border-gray-500">
                  <p className="font-bold tracking-widest opacity-65 p-1">
                    Totals
                  </p>
                  <p className="font-bold tracking-widest opacity-65 p-1">
                    KES {orderInDisplay.totalAmount.toString()}
                  </p>
                </div>
              </div>
            ) : (
              <h1>No order selected</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersViewComponent;
