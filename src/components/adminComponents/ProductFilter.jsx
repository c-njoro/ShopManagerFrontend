// ProductEdit.tsx
import {
  Edit,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const categories = [
  { id: "Utensil", name: "Utensil" },
  { id: "Plastic", name: "Plastic" },
  { id: "Clothes", name: "Clothes" },
  { id: "Shoes", name: "Shoes" },
  { id: "Stationery", name: "Stationery" },
  { id: "Other", name: "Other" },
];

const units = [
  { id: "pieces", name: "Pieces" },
  { id: "packets", name: "Packets" },
  { id: "sets", name: "Sets" },
  { id: "pairs", name: "Pairs" },
];

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Product Name" />
      <TextInput source="description" label="Description" multiline />

      <SelectInput source="category" label="Category" choices={categories} />

      <NumberInput source="price" label="Price" />
      <NumberInput source="discount" label="Discount (%)" />
      <NumberInput source="quantity" label="Quantity in Stock" />
      <SelectInput source="unit" label="Unit" choices={units} />

      {/* Optional fields */}
      <TextInput source="size" label="Size" />
      <TextInput source="color" label="Color" />
      <TextInput source="material" label="Material" />
      <TextInput source="brand" label="Brand" />

      {/* Custom Attributes */}
      <TextInput source="customAttributes.capacity" label="Capacity" />
      <TextInput source="customAttributes.shape" label="Shape" />
      <TextInput source="customAttributes.weight" label="Weight" />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
