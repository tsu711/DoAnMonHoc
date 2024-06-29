import React from "react";
import {
    List,
    Datagrid,
   TextField,
Edit,
SimpleForm,
EditButton,
TextInput,
NumberInput,
DateInput,
Create,
ReferenceInput,
SelectInput,
} from "react-admin";
export const listProduct = (props) => (
<List {...props} sortBy="id" sortOrder="ASC">
<Datagrid style={{ overflowX: "auto" }}>
<TextField source="id" />
<TextField source="title" />
<TextField source="price" />
<TextField source="discount" />
<TextField source="thumbnail" />
<TextField source="description" />
<TextField source="created_at" />
<TextField source="updated_at" />
<TextField source="category.name" />
<EditButton />
</Datagrid>
</List>
);
export const editProduct = (props) => (
    <Edit {...props}>
    <SimpleForm>
    <TextInput source="title" />
    <NumberInput source="price" />
<NumberInput source="discount" />
<TextInput source="thumbnail" />
<TextInput source="description" multiline fullWidth />
<DateInput source="created_at" />
<DateInput source="updated_at" />
<NumberInput source="deleted" />
<ReferenceInput
label="Category"
source="category.id"
reference="categories"
>
<SelectInput optionText="name" />
</ReferenceInput>
</SimpleForm>
</Edit>
);

export const createProduct = (props) => (
    <Create {...props}>
    <SimpleForm>
    <TextInput source="title" />
    <NumberInput source="price" />
    <NumberInput source="discount" />
    <TextInput source="thumbnail" />
    <TextInput source="description" multiline fullWidth />
    <DateInput source="created_at" />
    <DateInput source="updated_at" />
    <NumberInput source="deleted" />
    <ReferenceInput
    label="Category"
    source="category.id"
    reference="categories">
<SelectInput optionText="name" />
</ReferenceInput>
</SimpleForm>
</Create>
);