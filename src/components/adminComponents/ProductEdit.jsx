// ProductEdit.tsx
import {
  ArrayInput,
  Edit,
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

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
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

      {/* Custom attributes as editable key-value pairs */}
      <ArrayInput
        source="customAttributes"
        label="Custom Attributes"
        parse={(value) => {
          // Convert the customAttributes object to an array of {key, value} pairs
          if (value && typeof value === "object") {
            return Object.entries(value).map(([key, value]) => ({
              key,
              value,
            }));
          }
          return []; // If no customAttributes, return an empty array
        }}
        format={(value) => {
          // Convert the array back to an object for submission
          if (value && Array.isArray(value)) {
            return value.reduce((acc, { key, value }) => {
              if (key) acc[key] = value;
              return acc;
            }, {});
          }
          return {}; // Return an empty object if no valid value
        }}
      >
        <SimpleFormIterator>
          <TextInput source="key" label="Attribute Name" />
          <TextInput source="value" label="Attribute Value" />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
