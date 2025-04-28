import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  Filter,
  List,
  Pagination,
  SelectInput,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const OrderFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search by tracking id" source="trackingNumber" alwaysOn />
    <SelectInput
      label="Order Status"
      source="orderStatus"
      choices={[
        { id: "pending", name: "pending" },
        { id: "processing", name: "processing" },
        { id: "shipping", name: "shipping" },
        { id: "shipped", name: "shipped" },
        { id: "delivered", name: "delivered" },
        { id: "cancelled", name: "cancelled" },
        { id: "returned", name: "returned" },
      ]}
    />
    <SelectInput
      label="Payment Status"
      source="paymentStatus"
      choices={[
        { id: "pending", name: "pending" },
        { id: "paid", name: "paid" },
      ]}
    />
  </Filter>
);

const OrderList = (props) => {
  return (
    <List
      {...props}
      pagination={<ProductPagination />}
      perPage={5}
      filters={<OrderFilter />}
    >
      <Datagrid>
        <TextField source="id" />

        <TextField source="totalAmount" />

        <TextField source="seller.name" label="Seller Name" />

        <DateField source="orderedAt" label="Order Date" />

        <ArrayField source="products">
          <SingleFieldList>
            <ChipField source="productName" />
            <ChipField source="quantity" />
          </SingleFieldList>
        </ArrayField>
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default OrderList;
