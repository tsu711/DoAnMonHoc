import React, { useEffect, useState } from "react";
import Slider from "../pages/home/Slider";
import { GET_ALL } from "../pages/api/apiService";
import MenuList from "../pages/menu/Menulist";
import Service from "../pages/home/Services";
import Request from "../pages/home/Request";
import Item from "../pages/home/Items";
import Deal from "../pages/home/Deal";
import Mixi from "../pages/home/Mixi";
import PUBG from "../pages/home/PUBG";
import CSGO from "../pages/home/CSGO";
import "./Home.css"; // Import your CSS file
import LoadProducts from "../pages/home/LoadProduct";
import LoadProduct from "../pages/home/LoadProduct";
function Home() {
  const [categories, setCategories] = useState([]);
    useEffect(() => {
    GET_ALL(`categories`).then((item) => setCategories(item.data));
    }, [categories]);
    const filteredCategories = categories.filter(
    (category) => category.isHome === 1
    );

  return (
    <div className="container-fluid mb-5">
     {/* <Request /> */}
    {/* <Item/> */}
      {/* <Service /> */}
      {/* <Deal /> */}
     
      {/* <Mixi /> */}
      {/* <PUBG /> */}
      {/* <CSGO /> */}
      {filteredCategories.length > 0 &&
    filteredCategories.map((row) => (
    <LoadProduct categoryName={row.categoryName} categoryId={row.id} />
   
    ))}

      <div className="video-container">
        <div id="myVideo">
          <video autoPlay muted loop>
            <source
              src="https://shop.mixigaming.com/wp-content/uploads/2020/09/video-1598728053.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="text-overlay">
          <div className="col-inner text-center">
            <h1>MixiShop</h1>
            <p>Cập nhật thông tin về sản phẩm mới</p>
            <a
              href="https://www.facebook.com/MixiShop-182674912385853/"
              target="_blank"
              rel="noopener noreferrer"
              className="button white is-small"
            >
              <span>Fanpage</span>
            </a>
            <a
              href="https://www.instagram.com/mixi.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="button white is-outline is-small"
            >
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
