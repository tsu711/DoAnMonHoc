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

export  const listUser = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="username"/>
            <TextField source ="fullname"/>
            <TextField source ="email"/>
            <TextField source ="phone_number"/>
            <TextField source ="address"/>
            <TextField source ="password"/>
            <TextField source ="created_at"/>
            <TextField source ="updated_at"/>
           
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editUser = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
    <TextInput source="username"/>
    <TextInput source="fullname"/>
    <TextInput source="email"/>
    <TextInput source="phone_number"/>
    <TextInput source="address"/>
    <TextInput source="password"/>

    </SimpleForm>
    </Edit>
    
);

export  const createUser = (props) =>(
    <Create {...props}>
   
   <SimpleForm>
   <TextInput source="username"/>
    <TextInput source="fullname"/>
    <TextInput source="email"/>
    <TextInput source="phone_number"/>
    <TextInput source="address"/>
    <TextInput source="password"/>

    </SimpleForm>
   
    </Create>
    
    

);