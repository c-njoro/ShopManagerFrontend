// ProductShow.tsx
import { Box, Typography } from "@mui/material";
import {
  DateField,
  NumberField,
  Show,
  SimpleShowLayout,
  TextField,
  useShowContext,
} from "react-admin";

const CustomAttributes = () => {
  const { record } = useShowContext();

  if (!record || !record.customAttributes) return null;

  return (
    <Box mt={2}>
      <Typography variant="h6">Custom Attributes</Typography>
      {Object.entries(record.customAttributes).map(([key, value]) => (
        <Box key={key} display="flex" gap={1}>
          <Typography variant="body2" fontWeight={600}>
            {key}:
          </Typography>
          <Typography variant="body2">{value}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const ProductShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <TextField source="category" />
      <NumberField source="price" />
      <NumberField source="discount" />
      <NumberField source="quantity" />
      <TextField source="unit" />
      <TextField source="size" />
      <TextField source="color" />
      <TextField source="material" />
      <TextField source="brand" />

      {/* Custom attributes dynamically */}
      <CustomAttributes />

      {/* Timestamps */}
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

export default ProductShow;
