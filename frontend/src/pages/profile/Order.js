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
        console.log(response)
      })
      .catch((error) => {
        console.error("Không thể lấy đơn hàng:", error);
      });
  }, [userId]);

  const handleRemoveCartItem = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Không thể hủy đơn hàng:", error);
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="list-group">
              {/* <a className="list-group-item" href="/profile/main">Tổng quan tài khoản</a>
              <a className="list-group-item" href="/profile/address">Địa chỉ của tôi</a> */}
              <a className="list-group-item active" href="/profile/order">Đơn hàng của tôi</a>
              {/* <a className="list-group-item" href="/profile/wishlist">Danh sách yêu thích</a>
              <a className="list-group-item" href="/profile/seller">Sản phẩm đang bán</a>
              <a className="list-group-item" href="/profile/setting">Cài đặt</a> */}
            </nav>
          </aside>
          <main className="col-md-9">
            {orders.length === 0 ? (
              <p>Không có đơn hàng nào.</p>
            ) : (
              orders.map((row) => (
                <article key={row.id} className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-8">
                        <h6 className="text-muted">Giao hàng đến</h6>
                        <p>Họ và tên: {row.fullname}</p>
                        <p>Số điện thoại: {row.phoneNumber}</p>
                        <p>Email: {row.email}</p>
                        <p>Địa chỉ: {row.address}</p>
                      </div>
                      <div className="col-md-4">
                        <h6 className="text-muted">Phương thức thanh toán: {row.paymentMethod}</h6>
                        
                        
                        {/* <span className="text-success">
                          <i className="fab fa-lg fa-cc-visa"></i> Visa **** 4216
                        </span> */}
                        <p className="price text-muted">{row.totalMoney} <span className="text-muted">VNĐ</span></p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <p>Trạng thái: {row.status}</p>
                        <Link to={`/profile/orderDetails?orderId=${row.id}`} className="btn btn-outline-primary">
                          Chi tiết
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
                            Sửa
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button
                              className="dropdown-item"
                              onClick={() => handleRemoveCartItem(row.id)}
                            >
                              Hủy đơn hàng
                            </button>
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
