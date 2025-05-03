import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  Filter,
  List,
  Pagination,
  SingleFieldList,
  TextField,
  TextInput,
} from "react-admin";

const ProductPagination = (props) => (
  <Pagination rowsPerPageOptions={[5]} {...props} />
);

const OrderFilter = (props) => (
  <Filter {...props}>
    {/* Search by seller name */}
    <TextInput label="Search by seller" source="sellerName" alwaysOn />

    {/* Filter by date range */}
    <DateInput label="Start Date" source="orderedAt_gte" />
    <DateInput label="End Date" source="orderedAt_lte" />
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
        <ArrayField source="products">
          <SingleFieldList>
            <ChipField source="productName" />
            <ChipField source="quantity" />
          </SingleFieldList>
        </ArrayField>

        <TextField source="totalAmount" />

        <TextField source="seller.name" label="Seller Name" />
        <TextField source="customer.name" label="Customer Name" />
        <TextField source="customer.phone" label="Customer Number" />

        <DateField source="orderedAt" label="Order Date" />

        <DeleteButton />
      </Datagrid>
    </List>
  );
};

export default OrderList;
