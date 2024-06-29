import React from "react";
import { Link as RouterLink } from "react-router-dom";

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
  Button,
  ArrayField,
  SimpleFormIterator,
  ArrayInput,
  ReferenceField,
} from "react-admin";

export const listOrder = (props) => (
  <List {...props}>
    <Datagrid style={{ overflow: "auto" }}>
      <TextField source="id" />
      <TextField source="fullname" />
      <TextField source="email" />
      <TextField source="phoneNumber" />
      <TextField source="address" />
      <TextField source="orderDate" />
      <TextField source="status" />
      <TextField source="totalMoney" />
      <EditButton />
    </Datagrid>
  </List>
);

export const editOrder = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="fullname" />
      <TextInput source="email" />
      <TextInput source="phoneNumber" />
      <TextInput source="address" />
      <DateInput source="orderDate" />
      <TextInput source="status" />
      <TextInput source="paymentMethod" />
      <TextInput source="totalMoney" />
      {/* <ReferenceInput label="User" source="user.id" reference="users">
                <TextInput  source="fullname" />
            </ReferenceInput> */}
      {/* <ArrayInput source="listIdCart">
        <NumberInput />
      </ArrayInput>
      <ArrayInput source="orderDetails">
        <SimpleFormIterator>
          <ReferenceInput label="Product" source="product.id" reference="products">
            <SelectInput optionText="title" />
          </ReferenceInput>
          <NumberInput source="quantity" />
          <NumberInput source="priceOrder" />
          <ReferenceInput label="Color" source="color.id" reference="colors">
            <SelectInput optionText="name" />
          </ReferenceInput>
          <ReferenceInput label="Size" source="size.id" reference="sizes">
            <SelectInput optionText="name" />
          </ReferenceInput>
        </SimpleFormIterator>
      </ArrayInput> */}
    </SimpleForm>
  </Edit>
);

export const createOrder = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="fullname" />
      <TextInput source="email" />
      <TextInput source="phoneNumber" />
      <TextInput source="address" />
      <DateInput source="orderDate" />
      <TextInput source="status" />
      <TextInput source="paymentMethod" />
      <TextInput source="totalMoney" />
      <ReferenceInput label="User" source="userId" reference="users">
        <SelectInput optionText="fullname" />
      </ReferenceInput>
      <ArrayInput source="listIdCart">
      <NumberInput/>
      </ArrayInput>
      
      <ArrayInput source="orderDetails">
                <SimpleFormIterator>
                    <ReferenceInput label="Product" source="id" reference="products">
                        <SelectInput optionText="title" />
                    </ReferenceInput>
                    <NumberInput source="quantity" />
                    <NumberInput source="priceOrder" />
                    <TextInput source="color.name" label="Color" />
                    <TextInput source="size.name" label="Size" />
                </SimpleFormIterator>
            </ArrayInput>
    </SimpleForm>
  </Create>
);
