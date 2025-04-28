// UserList.tsx
import {
  Datagrid,
  DateField,
  EmailField,
  FunctionField,
  List,
  TextField,
} from "react-admin";

const UserList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="hireDate" label="Hire Date" />
      <FunctionField
        label="Number of Orders"
        render={(record) => record.orders?.length || 0}
      />
    </Datagrid>
  </List>
);

export default UserList;
