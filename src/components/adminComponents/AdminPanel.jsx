// Page.tsx
"use client";

import { Admin, Resource } from "react-admin";

import customDataProvider from "./customDataProvider";
import CustomLayout from "./CustomLayout";

import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductList from "./ProductList";
import ProductShow from "./ProductShow";

import UserCreate from "./UserCreate";
import UserEdit from "./UserEdit";
import UserShow from "./UserShow";
import UserList from "./UsersList";

import OrderEdit from "./OrderEdit";
import OrderList from "./OrderList";
import OrderShow from "./OrderShow";

const Page = () => {
  return (
    <Admin dataProvider={customDataProvider} layout={CustomLayout}>
      <Resource
        name="products"
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ProductShow}
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        create={UserCreate}
      />
      <Resource
        name="orders"
        list={OrderList}
        edit={OrderEdit}
        show={OrderShow}
      />
    </Admin>
  );
};

export default Page;
