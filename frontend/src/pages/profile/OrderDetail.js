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
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="section-content padding-y">
      <div className="container">
        <main className="col-md-9">
          {order ? (
            <article className="card mb-4">
              <div className="card-body">
                {/* <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-muted">Phương thức thanh toán</h6>
                    <p>{order.payment_Method}</p>
                    <span className="text-success">
                      <i className="fab fa-lg fa-cc-visa"></i> Visa **** 4216
                    </span>
                    <p className="price text-muted mt-2">{order.totalMoney} VNĐ</p>
                  </div>
                </div>
                <hr /> */}
                <div className="row">
                  <div className="col-md-12">
                    <h6 className="text-muted">Chi tiết sản phẩm</h6>
                    {order.orderDetails.map((item) => (
                      <div key={item.id} className="row mb-3">
                        <div className="col-md-3">
                          <img
                            src={`../images/items/${item.product.thumbnail}`}
                            alt="Hình ảnh sản phẩm"
                            style={{ width: "100%", height: "auto" }}
                          />
                        </div>
                        <div className="col-md-9">
                          <p><strong>Sản phẩm:</strong> {item.product.title}</p>
                          <p><strong>Giá:</strong> {formatPrice(item.product.price *item.quantity)} </p>
                          <p><strong>Danh mục:</strong> {item.product.category?.categoryName || 'N/A'}</p>
                          <p><strong>Số lượng:</strong> {item.quantity}</p>
                          <p><strong>Màu sắc:</strong> {item.color?.name || 'N/A'}</p>
                          <p><strong>Kích thước:</strong> {item.size?.name || 'N/A'}</p>
                        </div>
                        
                      </div>
                      
                    ))}
                  </div>
                </div>
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
