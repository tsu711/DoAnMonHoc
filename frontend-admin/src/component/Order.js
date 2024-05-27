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

export  const listOrder = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="fullname"/>
            <TextField source ="email"/>
            <TextField source ="phone_number"/>
            <TextField source ="address"/>
            <TextField source ="note"/>
            <TextField source ="order_date"/>
            <TextField source ="status"/>
            <TextField source ="total_money"/>
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editOrder = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
    <TextInput source="fullname"/>
    <TextInput source="email"/>
    <TextInput source="phone_number"/>
    <TextInput source="address"/>
    <TextInput source="description"/>
    <TextInput source="note"/>
    <DateInput source="order_date"/> 
    <NumberInput source="status"/>
    <NumberInput source="total_money"/>
    <NumberInput source="deleted"/>
    </SimpleForm>
    </Edit>
    
);

export  const createOrder = (props) =>(
    <Create {...props}>
   
   <SimpleForm>
   <TextInput source="fullname"/>
    <TextInput source="email"/>
    <TextInput source="phone_number"/>
    <TextInput source="address"/>
    <TextInput source="description"/>
    <TextInput source="note"/>
    <DateInput source="order_date"/> 
    <NumberInput source="status"/>
    <NumberInput source="total_money"/>
    <NumberInput source="deleted"/>
    </SimpleForm>
    </Create>
    
    

);