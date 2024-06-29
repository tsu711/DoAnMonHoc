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
    ReferenceField,
    NumberField,


} from "react-admin";

export const listOrderDetail = (props) => (
    <List {...props}>
        <Datagrid>
    
            <TextField source="id" />
            <TextField source="product.title" />
            <NumberField source="quantity" />
            <NumberField source="quantity" />
            <NumberField source="priceOrder" />
            <ReferenceField label="Color" source="color.id" reference="colors">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField label="Size" source="size.id" reference="sizes">
                <TextField source="name" />
            </ReferenceField>
            {/* <EditButton /> */}
        </Datagrid>
    </List>
);

export const editOrderDetail = (props) => (
    <Edit {...props}>
        <SimpleForm>
         
            <ReferenceInput label="Order" source="order.id" reference="orders">
                <SelectInput optionText="id" />
            </ReferenceInput>
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
        </SimpleForm>
    </Edit>
);

export const createOrderDetail = (props) => (
    <Create {...props}>
        <SimpleForm>
        <ReferenceInput label="Order" source="order.id" reference="orders">
                <SelectInput optionText="id" />
            </ReferenceInput>
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
        </SimpleForm>
    </Create>
);