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

export  const listToken = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="token"/>
            <TextField source ="created_at"/>
           
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editToken = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
 
    <TextField source ="token"/>
            <TextField source ="created_at"/>
    <NumberInput source="deleted"/>
    </SimpleForm>
    </Edit>
    
);

export  const createToken = (props) =>(
    <Create {...props}>
   
   <SimpleForm>

   <TextField source ="token"/>
    <TextField source ="created_at"/>
    <NumberInput source="deleted"/>
    </SimpleForm>
    </Create>
    
    

);