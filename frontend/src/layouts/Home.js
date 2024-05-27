import React, { useEffect, useState } from "react";
import Slider from "../pages/home/Slider";
import Deal from "../pages/home/Deal";
import Mixi from "../pages/home/Mixi";
import LoadProduct from "../pages/home/LoadProduct";
import CSGO from "../pages/home/CSGO";
import Items from "../pages/home/Items";
import PUBG from "../pages/home/PUBG";
import { GET_ALL } from "../pages/api/apiService";    


function Home() {
    
    const [categories, setCategories] = useState([]);
    useEffect(() => {
    GET_ALL(`categories`).then((item) => setCategories(item.data));
    }, [categories]);
    const filteredCategories = categories.filter(
    (category) => category.isHome === 1
    );
    return (
        <>
    <div class="container">
    <Slider />
    
    {filteredCategories.length > 0 &&
    filteredCategories.map((row) => (
    <LoadProduct categoryName={row.name} categoryId={row.id} />
   
    ))}
  
    <Items/>

   
    
 
    
    
    
    </div>
    
    </>
    );
    }
    export default Home;
