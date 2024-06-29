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
ReferenceField,
SelectField,
} from "react-admin";
export const listProduct = (props) => (
<List {...props} sortBy="id" sortOrder="ASC">
<Datagrid style={{ overflowX: "auto" }}>
<TextField source="id" />
<TextField source="title" />
<TextField source="price" />
<TextField source="discount" />
<TextField source="thumbnail" />
<TextField source="quantity" />
<TextField source="created_at" />
<TextField source="updated_at" />
<ReferenceField label="Category" source="category.id" reference="categories">
        <TextField source="categoryName" />
      </ReferenceField>
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
<TextInput source="quantity" />
<TextInput source="description" multiline fullWidth />
<DateInput source="created_at" />
<DateInput source="updated_at" />
<ReferenceInput
label="Category"
source="category.id"
reference="categories"
>
<SelectInput optionText="categoryName" />
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
    <TextInput source="quantity" />
    <TextInput source="description" multiline fullWidth />
    <DateInput source="created_at" />
    <DateInput source="updated_at" />
    <ReferenceInput
    label="Category"
    source="category.id"
    reference="categories">
<SelectInput optionText="categoryName" />
</ReferenceInput>
</SimpleForm>
</Create>
);