import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/orders/users/${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
      });
  }, [userId]); // Fetch orders again if userId changes

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="list-group">
              <a className="list-group-item" href="/profile/main">
                Account overview
              </a>
              <a className="list-group-item" href="/profile/address">
                My Address
              </a>
              <a className="list-group-item active" href="/profile/order">
                My Orders
              </a>
              <a className="list-group-item" href="/profile/wishlist">
                My wishlist
              </a>
              <a className="list-group-item" href="/profile/seller">
                My Selling Items
              </a>
              <a className="list-group-item" href="/profile/setting">
                Settings
              </a>
            </nav>
          </aside>
          <main className="col-md-9">
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((row) => (
                <article key={row.id} className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h6 className="text-muted">Delivery to</h6>
                        <p>Name: {row.fullname}</p>
                        <p>Phone: {row.phoneNumber}</p>
                        <p>Email: {row.email}</p>
                        <p>Location: {row.address}</p>
                      </div>
                      <div className="col-md-4">
                      <h6 className="text-muted">Payment</h6>
                        <p>{row.paymentMethod}</p>
                        <span className="text-success">
                          <i className="fab fa-lg fa-cc-visa"></i> Visa **** 4216
                        </span>
                        <p className="price text-muted">USD {row.totalMoney}</p>
                      </div>
                    </div>
                    <div className="row">
                      
                      <div className="col-md-5">
                        <p className="title mb-0">Product name goes here</p>
                        <p>Seller: Nike clothing</p>
                      </div>
                      <div className="col-md-5">
                      <p>Status:{row.status}</p>
                        <Link to={`/profile/orderDetails?orderId=${row.id}`} className="btn btn-outline-primary">
                          Detail
                        </Link>
                        <div className="dropdown d-inline-block">
                          <button
                            className="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            More
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">
                              Trả hàng
                            </a>
                            <a className="dropdown-item" href="#">
                              Hủy đơn hàng
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Order;
