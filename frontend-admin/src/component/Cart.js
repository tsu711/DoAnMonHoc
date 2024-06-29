import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  ReferenceInput,
  SelectInput,
  NumberInput,
  DateInput,
  NumberField,
  ReferenceField,
} from "react-admin";

export const listCart = (props) => (
    <List {...props}>
      <Datagrid style={{ overflow: "auto" }}>
        <TextField source="id" />
        <ReferenceField label="Color" source="color.id" reference="colors">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Size" source="size.id" reference="sizes">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Product" source="productId" reference="products">
          <TextField source="title" />
        </ReferenceField>
        <NumberField source="quantity" />
        <NumberField source="price" />
        <TextField source="userId" />
        <EditButton />
      </Datagrid>
    </List>
  );
  export const editCart = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput label="Color" source="color.id" reference="colors">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Size" source="size.id" reference="sizes">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Product" source="productId" reference="products">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <NumberInput source="quantity" />
        <NumberInput source="price" />
        <TextInput source="userId" />
      </SimpleForm>
    </Edit>
  );

  export const createCart = (props) => (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput label="Color" source="color.id" reference="colors">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Size" source="size.id" reference="sizes">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Product" source="productId" reference="products">
          <SelectInput optionText="title" />
        </ReferenceInput>
        <NumberInput source="quantity" />
        <NumberInput source="price" />
        <TextInput source="userId" />
      </SimpleForm>
    </Create>
  );
