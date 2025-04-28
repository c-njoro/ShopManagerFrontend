// UserCreate.tsx
import { Create, SelectInput, SimpleForm, TextInput } from "react-admin";

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="password" type="password" />
      <TextInput source="profilePicture" />
      <SelectInput
        source="role"
        choices={[
          { id: "employee", name: "Employee" },
          { id: "admin", name: "Admin" },
        ]}
      />
    </SimpleForm>
  </Create>
);

export default UserCreate;
