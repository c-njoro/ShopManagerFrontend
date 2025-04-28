// ProductShow.tsx
import {
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const ProductShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="Name" />
      <TextField source="description" label="Description" />
      <TextField source="category" label="Category" />
      <NumberField
        source="price"
        label="Price (Ksh)"
        options={{ style: "currency", currency: "KES" }}
      />
      <NumberField source="discount" label="Discount (%)" />
      <NumberField source="quantity" label="Quantity" />
      <TextField source="unit" label="Unit" />
      <TextField source="size" label="Size" />
      <TextField source="color" label="Color" />
      <TextField source="material" label="Material" />
      <TextField source="brand" label="Brand" />
      {/* Display customAttributes as JSON (optional) */}
      <TextField source="customAttributes.capacity" label="Capacity" />
      <TextField source="customAttributes.shape" label="Shape" />
      <TextField source="customAttributes.weight" label="Weight" />
      <DateField source="createdAt" label="Created At" />
      <DateField source="updatedAt" label="Updated At" />
    </SimpleShowLayout>
  </Show>
);

export default ProductShow;
