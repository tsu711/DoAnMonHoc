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

export  const listMenu = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="menu"/>
           
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editMenu = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
    <TextInput source="menu"/>
    <TextInput source="menu_item"/>
    <NumberInput source="deleted"/>
   
    </SimpleForm>
    </Edit>
    
);

export  const createMenu = (props) =>(
    <Create {...props}>
   
   <SimpleForm>
    <TextInput source="menu"/>
    <TextInput source="menu_item"/>
    <NumberInput source="deleted"/>
   
    </SimpleForm>
    </Create>
    
    

);