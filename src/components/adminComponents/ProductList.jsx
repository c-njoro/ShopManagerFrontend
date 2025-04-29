// ProductList.tsx
import { useMediaQuery } from "@mui/material";
import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  NumberField,
  SelectInput,
  SimpleList,
  TextField,
  TextInput,
} from "react-admin";

const categoryFilters = [
  { id: "Utensil", name: "Utensil" },
  { id: "Plastic", name: "Plastic" },
  { id: "Clothing", name: "Clothing" },
  { id: "Shoe", name: "Shoe" },
  { id: "Stationery", name: "Stationery" },
  { id: "Other", name: "Other" },
];

const ProductFilter = [
  <TextInput label="Search by name" source="name" alwaysOn />,
  <SelectInput label="Category" source="category" choices={categoryFilters} />,
];

const ProductList = (props) => {
  const isSmall = useMediaQuery("(max-width:600px)");

  return (
    <List filters={ProductFilter} {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => `Ksh ${record.price}`}
          tertiaryText={(record) => `${record.quantity} ${record.unit}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="name" label="Name" />
          <TextField source="category" label="Category" />
          <NumberField
            source="price"
            label="Price (Ksh)"
            options={{ style: "currency", currency: "KES" }}
          />
          <NumberField source="discount" label="Discount (%)" />
          <NumberField source="quantity" label="Quantity" />
          <TextField source="unit" label="Unit" />
          <TextField source="brand" label="Brand" />
          <EditButton />
          <DeleteButton />
        </Datagrid>
      )}
    </List>
  );
};

export default ProductList;
