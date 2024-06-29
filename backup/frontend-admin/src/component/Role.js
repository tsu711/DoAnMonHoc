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

export  const listRole = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="created_at"/>
           
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editRole = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
 
    <TextInput source="created_at"/>
    <NumberInput source="deleted"/>
    </SimpleForm>
    </Edit>
    
);

export  const createRole = (props) =>(
    <Create {...props}>
   
   <SimpleForm>

    <TextInput source="created_at"/>
    <NumberInput source="deleted"/>
    </SimpleForm>
    </Create>
    
    

);