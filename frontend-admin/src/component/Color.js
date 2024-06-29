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

export  const listColor = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="name"/>
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editColor = (props) =>(

    
    <Edit {...props}> 
   <SimpleForm>

<TextInput source ="name"/>

 </SimpleForm>
    </Edit>
    
);

export  const createColor = (props) =>(
    <Create {...props}>
   
   <SimpleForm>

<TextInput source ="name"/>

 </SimpleForm>
    </Create>
    
    

);