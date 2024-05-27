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

export  const listFeedback = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="fistname"/>
            <TextField source ="lastname"/>
            <TextField source ="email"/>
            <TextField source ="phone_number"/>
            <TextField source ="subject_name"/>
            <TextField source ="note"/>
            <TextField source ="status"/>
            <TextField source ="created_at"/>
            <TextField source ="updated_at"/>
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editFeedback = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
    <TextInput source="fistname"/>
    <TextInput source="lastname"/>
    <TextInput source="email"/>
    <TextInput source="phone_number"/>
    <TextInput source="subject_name"/>
    <TextInput source="note"/>
    <DateInput source="created_at"/>
    <DateInput source="updated_at"/> 
    <NumberInput source="deleted"/>
   
    </SimpleForm>
    </Edit>
    
);

export  const createFeedback = (props) =>(
    <Create {...props}>
   
   <SimpleForm>
    <TextInput source="title"/>
    <NumberInput source="price"/>
    <NumberInput source="discount"/>
    <TextInput source="thumbnail"/>
    <TextInput source="description"/>
    <DateInput source="created_at"/>
    <DateInput source="updated_at"/>
    <NumberInput source="title"/>
    <NumberInput source="deleted"/>
    
    </SimpleForm>
    </Create>
    
    

);