import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Search from "../pages/search/Search";
import MenuList from "../pages/menu/Menulist";
import Slider from "../pages/home/Slider";
import { GET_ALL } from "../pages/api/apiService";

function Header() {
  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const handleLogout = () => {
    localStorage.clear(); // Clear all data in localStorage
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/carts/users/${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setCartItems(data);
          } else {
            console.error("Failed to fetch cart items");
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCartItems();
  }, []);
  useEffect(() => {
    const fetchOrderItems = async () => {
      const userId = localStorage.getItem("id");
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/orders/users/${userId}`
          );
          if (response.ok) {
            const data = await response.json();
            setOrderItems(data);
          } else {
            console.error("Failed to fetch cart items");
          }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchOrderItems();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    GET_ALL(`categories`).then((item) => setCategories(item.data));
  }, []);

  const showMenuAndSlider = location.pathname === "/";

  return (
    <header class="section-header">
      <div class="container">
        <div class="row align-items-center">
          <div className="col-xl-2 col-lg-3 col-md-12">
            <Link
              to="/"
              className="navbar-brand"
              title="MixiShop - MixiShop"
              rel="home"
            >
              <img
                width="151"
                height="auto"
                src="https://shop.mixigaming.com/wp-content/uploads/2019/06/logo-mixi-tét.png"
                className="header-logo-dark img-fluid"
                alt="MixiShop"
              />
            </Link>
          </div>

          <div className="col-xl-6 col-lg-5 col-md-6">
            <Search />
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="widgets-wrap float-md-right">
              <div className="widget-header mr-3">
                {fullname ? (
                  <Link className="widget-view" onClick={handleLogout}>
                    <div className="icon-area">
                      <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <small className="text">{fullname}</small>
                  </Link>
                ) : (
                  <Link to="/login" className="widget-view">
                    <div className="icon-area">
                      <i className="fa fa-user"></i>
                    </div>
                    <small className="text"> Đăng nhập </small>
                  </Link>
                )}
              </div>
              <div className="widget-header mr-3">
                <Link to="/profile/order" className="widget-view">
                  <div className="icon-area">
                  <span className="notify">{orderItems.length}</span>
                    <i className="fa fa-store"></i>
                  </div>
                  
                  <small className="text"> Đơn hàng </small>
                </Link>
              </div>
              <div className="widget-header">
                <Link to="/shopping/cart" className="widget-view">
                  <div className="icon-area">
                    <span className="notify">{cartItems.length}</span>
                    <i className="fa fa-shopping-cart"></i>
                  </div>
                  <small className="text"> Giỏ hàng </small>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* <nav class="navbar navbar-main navbar-expand-lg border-bottom">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main_nav"
              aria-controls="main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main_nav">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  {" "}
                  <i class="fa fa-bars text-muted mr-2"></i> Danh mục sản phẩm{" "}
                </a>
                <div class="dropdown-menu dropdown-large">
                  {" "}
                  {categories.length > 0 &&
                    categories.map((row) => (
                      <a
                        className="nav-link text-center text-bold"
                        href={`/listing?categoryId=${row.id}`}
                        key={row.id}
                      >
                        {row.categoryName}
                      </a>
                    ))}
                </div>
                </li>
                
                
              </ul>

            </div>
          </div>

          <div className="col-lg-10">
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-light py-3 py-lg-0 px-0">
                <div
                  className="collapse navbar-collapse justify-content-between bg-white"
                  id="navbarCollapse"
                >
                  <MenuList />
                </div>
              </nav>
            </div>
          </div>
          
        </nav> */}

        <nav class="navbar navbar-main navbar-expand-lg border-bottom">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#main_nav"
              aria-controls="main_nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="main_nav">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                  >
                    {" "}
                    <i class="fa fa-bars text-muted mr-2"></i> Danh mục sản phẩm{" "}
                  </a>
                  <div class="dropdown-menu dropdown-large">
                    <nav class="row">
                      <div class="col-12">
                        {categories.length > 0 &&
                          categories.map((row) => (
                            <a
                              className="nav-link text-center text-bold"
                              href={`/listing?categoryId=${row.id}`}
                              key={row.id}
                            >
                              {row.categoryName}
                            </a>
                          ))}
                      </div>
                    </nav>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/">
                    Trang chủ
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/information">
                    Thông báo
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/listing">
                    Tất cả sản phẩm
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {showMenuAndSlider && <Slider />}
      
    </header>
  );
}

export default Header;
