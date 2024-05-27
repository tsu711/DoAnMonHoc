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


} from "react-admin";

export  const listOrderDetail = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="price"/>
            <TextField source ="num"/>
            <TextField source ="total_money"/>
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editOrderDetail = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
 
    <NumberInput source ="price"/>
    <NumberInput source ="num"/>
    <NumberInput source ="total_money"/>
    <NumberInput source="deleted"/>
    <ReferenceInput label="product"
    source="product.id"
    reference="products"><SelectInput optionText="name"/></ReferenceInput>
    </SimpleForm>
    </Edit>
    
);

export  const createOrderDetail = (props) =>(
    <Create {...props}>
   
   <SimpleForm>

   <NumberInput source ="price"/>
    <NumberInput source ="num"/>
    <NumberInput source ="total_money"/>
    <NumberInput source="deleted"/>
    <ReferenceInput label="product"
    source="product.id"
    reference="products"><SelectInput optionText="name"/></ReferenceInput>
    </SimpleForm>
    </Create>
    
    

);