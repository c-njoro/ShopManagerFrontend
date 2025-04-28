// UserEdit.tsx
import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin";

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="profilePicture" />
      <SelectInput
        source="role"
        choices={[
          { id: "employee", name: "Employee" },
          { id: "admin", name: "Admin" },
        ]}
      />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
