import axios from "axios";
import React, { useEffect, useState } from "react";
import { GET_ALL } from "../pages/api/apiService";
import MenuList from "../pages/menu/Menulist";
import Search from "../pages/search/Search";

function Header() {
  const fullname = localStorage.getItem("fullname");

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("fullname");
    alert("Logout successful");
    window.location.reload();
  };

  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    // Lấy thông tin giỏ hàng từ localStorage hoặc API
    const storedCartItems = localStorage.getItem("cartItems") || "[]";
    const parsedCartItems = JSON.parse(storedCartItems);
    setCartItems(parsedCartItems);
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    GET_ALL(`categories`).then((item) => setCategories(item.data));
  }, []);
  return (
    <header className="section-header">
      <section className="header-main border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div id="logo" className="flex-col logo">
              <a href="/" title="MixiShop - MixiShop" rel="home">
                <img
                  width="151"
                  height="100"
                  src="https://shop.mixigaming.com/wp-content/uploads/2019/06/logo-mixi-tét.png"
                  className="header-logo-dark"
                  alt="MixiShop"
                />
              </a>
            </div>
            <Search />
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="widgets-wrap float-md-right">
              <div className="widget-header mr-3">
  {fullname ? (
    <>
      
      <small className="text">Xin chào: {fullname}</small>{" "}
      <small className="center" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt padding-20"></i> Đăng xuất
      </small>
    </>
    
  ) : (
    <a href="/login" className="widget-view">
      <div className="icon-area">
        <i className="fa fa-user"></i>
      </div>
      <small className="text">Đăng nhập</small>
    </a>
  )}
</div>



                <div class="widget-header mr-3">
                  <a href="#" class="widget-view">
                    <div class="icon-area">
                      <i class="fa fa-comment-dots"></i>
                    </div>
                    <small class="text"> Tin nhắn </small>
                  </a>
                </div>
                <div class="widget-header mr-3">
                  <a href="/profile/order " class="widget-view">
                    <div class="icon-area">
                      <i class="fa fa-store"></i>
                    </div>
                    <small class="text"> Đơn hàng </small>
                  </a>
                </div>
                <div class="widget-header">
                  <a href="/shopping/cart" class="widget-view">
                    <div class="icon-area">
                      <i class="fa fa-shopping-cart"></i>
                      <span class="notify">{cartItems.length}</span>
                    </div>
                    <small class="text"> Giỏ hàng </small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  <i class="fa fa-bars text-muted mr-2"></i> Danh mục sản phẩm{" "}
                </a>
                <div class="dropdown-menu dropdown-large">
                  <nav class="row">
                    <div class="col-6">
                      {categories.length > 0 &&
                        categories.map((row) => (
                          <a
                            class="dropdown-item"
                            href={`/listing?categoryId=${row.id}`}
                          >
                            {row.name}
                          </a>
                        ))}
                   
                    </div>
                  </nav>
                </div>
              </li>

              <MenuList />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
