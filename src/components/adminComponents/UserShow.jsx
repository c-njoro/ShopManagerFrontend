// UserShow.tsx
import {
  DateField,
  EmailField,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField source="hireDate" label="Hire Date" />
      <FunctionField
        label="Number of Orders"
        render={(record) => record.orders?.length || 0}
      />
    </SimpleShowLayout>
  </Show>
);

export default UserShow;
