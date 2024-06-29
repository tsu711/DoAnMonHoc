import React from "react";
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    List,
    NumberInput,
    SimpleForm,
    TextField,
    TextInput
} from "react-admin";

export  const listBanner = (props) =>(
    <List {...props}>
        <Datagrid style={{overflow:"auto"}}>
            <TextField source ="id"/>
            <TextField source ="thumbnail"/>
           
            <EditButton/>
        </Datagrid>
    </List>

);

export  const editBanner = (props) =>(

    
    <Edit {...props}> 
    <SimpleForm>
    <TextInput source="thumbnail"/>

    <NumberInput source="deleted"/>
   
    </SimpleForm>
    </Edit>
    
);

export  const createBanner = (props) =>(
    <Create {...props}>
   
   <SimpleForm>
    <TextInput source="thumbnail"/>

    <NumberInput source="deleted"/>
   
    </SimpleForm>
    </Create>
    
    

);