// ProductShow.js
import {
  ArrayField,
  NumberField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
} from "react-admin";

const OrderShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="seller.name" label="Sellers Name" />
      <TextField source="customer.name" label="Customers Name" />
      <TextField source="customer.phone" label="Customers Number" />
      <ArrayField source="products">
        <SingleFieldList>
          <TextField source="productName" label="Name" />
          <br />
          <TextField source="quantity" label="Quantity" aria-label="Quantity" />
          <br />
          <TextField source="unitPrice" label="Unit Price" />
          <br />
          <TextField source="totalPrice" label="Total Price" />
        </SingleFieldList>
      </ArrayField>
      <NumberField source="totalAmount" />
    </SimpleShowLayout>
  </Show>
);

export default OrderShow;
