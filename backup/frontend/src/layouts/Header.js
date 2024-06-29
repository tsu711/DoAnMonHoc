import React, { useEffect, useState } from "react";
import Search from "../pages/search/Search";
import { useNavigate } from "react-router-dom";

function Header() {
  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();

  const handleLogout = () => {
    const userId = localStorage.getItem("id");
    if (userId) {
      localStorage.removeItem(`cartItems`);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("fullname");
    localStorage.removeItem("address");
    localStorage.removeItem("phone_number");
    // Add any other items you need to clear from localStorage

    navigate("/login");
  };

  const [cartItems, setCartItems] = useState([]);
  
  // Function to group products by their productId and sum quantities
  const groupProducts = (products) => {
    const productMap = products.reduce((map, product) => {
      const { productId, quantity } = product;
      if (map[productId]) {
        map[productId].quantity += quantity;
      } else {
        map[productId] = { ...product };
      }
      return map;
    }, {});
    return Object.values(productMap);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
        const userId = localStorage.getItem("id");
        if (userId) {
            try {
                const response = await fetch(`http://localhost:8080/api/carts/users/${userId}`);
                if (response.ok) {
                    const data = await response.json();
                    const groupedProducts = groupProducts(data);
                    setCartItems(groupedProducts);
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

  return (
    <header className="section-header sticky-top">
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
              
                <div className="widget-header mr-3">
                  <a href="/profile/order" className="widget-view">
                    <div className="icon-area">
                      <i className="fa fa-store"></i>
                    </div>
                    <small className="text"> Đơn hàng </small>
                  </a>
                </div>
                <div className="widget-header">
                  <a href="/shopping/cart" className="widget-view">
                    <div className="icon-area">
                      <i className="fa fa-shopping-cart"></i>
                      <span className="notify">{cartItems.length}</span>
                    </div>
                    <small className="text"> Giỏ hàng </small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}

export default Header;
