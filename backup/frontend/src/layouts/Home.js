import React, { useEffect, useState } from "react";
import Slider from "../pages/home/Slider";
import { GET_ALL } from "../pages/api/apiService";
import MenuList from "../pages/menu/Menulist";
import Service from "../pages/home/Services";
import Request from "../pages/home/Request";
import Deal from "../pages/home/Deal";
import Mixi from "../pages/home/Mixi";
import PUBG from "../pages/home/PUBG";
import CSGO from "../pages/home/CSGO";

function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    GET_ALL(`categories`).then((item) => setCategories(item.data));
  }, []);


  return (
    <div className="container-fluid mb-5">
      <div className="row border-top px-xl-5">
        <div className="col-lg-3 d-none d-lg-block ">
          <a
            className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
            data-toggle="collapse"
            href="#navbar-vertical"
          >
            <i className="fa fa-bars text-muted mr-2"></i> Danh mục sản
            phẩm
            <i className="fa fa-angle-down text-dark"></i>
          </a>
          <nav
            className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
            id="navbar-vertical"
          >
            <div
              className="navbar-nav w-100 overflow-hidden"
              style={{ height: "410px" }}
            >
           
              {categories.length > 0 &&
                categories.map((row) => (
                  <a
                    className="nav-item nav-link"
                    href={`/listing?categoryId=${row.id}`}
                    key={row.id}
                  >
                    {row.categoryName}
                  </a>
                ))}
            </div>
          </nav>
        </div>
        <div className="col-lg-9">
          <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0 px-0">
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarCollapse"
            >
              <div className="navbar-nav mr-auto py-0 tẽ">
                <MenuList />
              </div>
            </div>
          </nav>
          <Slider />
        </div>
      </div>
      <Service/>

    <Deal/>
  <Request/>
  <Mixi/>
  <PUBG/>
  <CSGO/>               
    
    

      
      
    </div>
  );
}

export default Home;
