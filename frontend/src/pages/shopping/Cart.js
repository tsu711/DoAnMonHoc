import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateQuanlityOrder } from "../api/apiService";
import axios from "axios";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const calculateTotalMoney = (items) => {
    const total = items.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Lấy danh sách sản phẩm trong giỏ hàng từ API
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/carts/users/${userId}`
      );
      setProducts(response.data);
      calculateTotalMoney(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Hàm cập nhật số lượng sản phẩm
  const handleUpdateQuantity = async (itemEdit) => {
    try {
      let searchObj = {
        userId: localStorage.getItem("id"),
        productId: itemEdit?.product.id,
      };
      let formData = new FormData();
      formData.append("newQuantity", itemEdit?.quantity);
      const data = await updateQuanlityOrder(searchObj, formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm xử lý khi người dùng thay đổi số lượng
  const handleChangeQuantity = (itemData, value) => {
    const updatedProducts = products.map((i) => {
      if (i.cartId === itemData.cartId) {
        i.quantity = value;
        handleUpdateQuantity(i);
      }
      return i;
    });
    setProducts(updatedProducts);
    calculateTotalMoney(updatedProducts);
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveCartItem = async (value) => {
    try {
      await axios.delete(`http://localhost:8080/api/carts/${value.cartId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để tiếp tục.");
      navigate("/login");
      return;
    }
    navigate("/formcart");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="section-content padding-y">
      <div className="container align-items: center;">
        <div className="item">
          <main className="col-md-9">
            <div className="card">
              {products.length > 0 ? (
                <>
                  {products.map((item) => (
                    <table
                      className="table table-borderless table-shopping-cart"
                      key={item.product.id}
                    >
                      <thead className="text-muted">
                        <tr className="small text-uppercase">
                          <th scope="col">Sản phẩm</th>
                          <th scope="col" width="120">
                            Số lượng
                          </th>
                          <th scope="col" width="120">
                            Giá
                          </th>
                          <th scope="col" className="text-right" width="200">
                            {" "}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <figure className="itemside">
                              <div className="aside">
                                <img
                                  src={`../images/items/${item.product.thumbnail}`}
                                  style={{ width: "100px" }}
                                  alt={item.title}
                                />
                              </div>
                              <figcaption className="info">
                                <a href="#" className="title text-dark">
                                  {item.product.title}
                                </a>
                                <p>Màu: {item.color ? item.color.name : "-"}</p>
                                <p>
                                  Kích cỡ: {item.size ? item.size.name : "-"}
                                </p>
                              </figcaption>
                            </figure>
                          </td>
                          <td className="product_quantity">
                            <input
                              className="form-control"
                              min="1"
                              max="5"
                              value={item?.quantity}
                              type="number"
                              onChange={(e) =>
                                handleChangeQuantity(item, e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <div className="price-wrap">
                              <div className="price">
                                {formatPrice(item.product.price * item.quantity)}
                              </div>
                            </div>
                          </td>
                          <td className="text-right">
                            <button
                              className="btn btn-light"
                              onClick={() => handleRemoveCartItem(item)}
                            >
                              {" "}
                              Xóa
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                  <div className="card-body border-top">
                    <button
                      className="btn btn-info float-md-right"
                      onClick={handleCheckout}
                    >
                      Mua hàng <i className="fa fa-chevron-right"></i>
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={handleContinueShopping}
                    >
                      <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm
                    </button>
                  </div>
                </>
              ) : (
                <div className="card-body">
                  <p>Giỏ hàng của bạn trống</p>
                  <button
                    className="btn btn-light"
                    onClick={handleContinueShopping}
                  >
                    <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm
                  </button>
                </div>
              )}
            </div>
            <div className="alert alert-success mt-3">
              <p className="icontext">
                <i className="icon text-success fa fa-truck"></i> Giao hàng miễn
                phí trong 1-2 tuần
              </p>
            </div>
          </main>
          {/* <aside className="col-md-3">
            <div className="card mb-3">
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Có mã giảm giá?</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        placeholder="Mã giảm giá"
                      />
                      <span className="input-group-append">
                        <button className="btn btn-info">Áp dụng</button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>*/}
            <div className="card">
              <div className="card-body">
                <dl className="dlist-align">
                  <dt>Tổng giá:</dt>
                  <dd className="text-right">{totalPrice}</dd>
                </dl>
                {/* <dl className="dlist-align">
                  <dt>Giảm giá:</dt>
                  <dd className="text-right">$0</dd>
                </dl> */}
              </div>
            </div>
          
        </div>
      </div>
    </section>
  );
};

export default Cart;
