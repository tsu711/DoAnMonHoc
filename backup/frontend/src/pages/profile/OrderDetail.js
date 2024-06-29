import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_ID } from "../api/apiService";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      GET_ID(`orders`, orderId)
        .then((response) => {
          setOrder(response.data);
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
        });
    }
  }, [orderId]);

  return (
    <section className="section-content padding-y">
      <div className="container">
        <main className="col-md-9">
          {order ? (
            <article className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8">
                    <h6 className="text-muted">Giao hàng đến</h6>
                    <p>Tên: {order.fullname}</p>
                    <p>Điện thoại: {order.phone_number}</p>
                    <p>Email: {order.email}</p>
                    <p>Địa chỉ: {order.address}</p>
                  </div>
                  <div className="col-md-4">
                    <img
                      src={`../images/items/${order.thumbnail}`}
                      alt="Hình ảnh sản phẩm"
                      style={{ width: "100%" }}
                    />
                   <h6 className="text-muted">Payment</h6>
                        <p>{order.payment_Method}</p>
                        <span className="text-success">
                          <i className="fab fa-lg fa-cc-visa"></i> Visa **** 4216
                        </span>
                    <p className="price text-muted">USD {order.totalMoney}</p>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <h6 className="text-muted">Trạng thái đơn hàng</h6>
                    <p>{order.status}</p>
                  </div>
                </div>
                {order.orders && order.orders.length > 0 && (
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <img
                        src={require("../../assets/images/items/aocsgo1.jpg")}
                        style={{ width: "80%" }}
                        alt="Hình ảnh sản phẩm"
                      />
                      <p className="title mb-0">{order.orders[0].name}</p>
                      <p>Người bán: {order.orders[0].seller}</p>
                      <a href="#" className="btn btn-outline-primary">
                        Theo dõi đơn hàng
                      </a>
                      <div className="dropdown d-inline-block">
                        <a
                          href="#"
                          className="dropdown-toggle btn btn-outline-secondary"
                          data-toggle="dropdown"
                        >
                          Thêm
                        </a>
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
                )}
              </div>
            </article>
          ) : (
            <div>Không có chi tiết đơn hàng.</div>
          )}
        </main>
      </div>
    </section>
  );
};

export default OrderDetails;
