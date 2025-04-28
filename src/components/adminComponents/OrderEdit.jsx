// ProductEdit.js
import { Edit, SimpleForm, TextInput } from "react-admin";

const payment = [
  { id: "pending", name: "pending" },
  { id: "paid", name: "paid" },
];

const ProductEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled />
    </SimpleForm>
  </Edit>
);

export default ProductEdit;
