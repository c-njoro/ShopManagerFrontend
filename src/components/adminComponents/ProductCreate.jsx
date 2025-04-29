// ProductCreate.tsx
import {
  ArrayInput,
  Create,
  NumberInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
} from "react-admin";

const categories = [
  { id: "Utensil", name: "Utensil" },
  { id: "Plastic", name: "Plastic" },
  { id: "Clothing", name: "Clothing" },
  { id: "Shoe", name: "Shoe" },
  { id: "Stationery", name: "Stationery" },
  { id: "Other", name: "Other" },
];

const units = [
  { id: "pieces", name: "Pieces" },
  { id: "packets", name: "Packets" },
  { id: "sets", name: "Sets" },
  { id: "pairs", name: "Pairs" },
];

const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput multiline source="description" />
      <SelectInput source="category" choices={categories} />
      <NumberInput source="price" />
      <NumberInput source="discount" />
      <NumberInput source="quantity" />
      <SelectInput source="unit" choices={units} />
      <TextInput source="size" />
      <TextInput source="color" />
      <TextInput source="material" />
      <TextInput source="brand" />

      <ArrayInput source="customAttributes">
        <SimpleFormIterator>
          <TextInput source="key" label="Attribute Name" />
          <TextInput source="value" label="Attribute Value" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);

export default ProductCreate;
