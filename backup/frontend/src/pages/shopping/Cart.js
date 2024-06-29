import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateQuanlityOrder } from "../api/apiService";
import axios from "axios";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    // Hàm nhóm sản phẩm theo id và tổng hợp số lượng
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

    const calculateTotalMoney = (items) => {
        const total = items.reduce((sum, product) => sum + product.price * product.quantity, 0);
        setTotalPrice(total);
    };

    // Lấy danh sách sản phẩm trong giỏ hàng từ API
    const fetchCartItems = async () => {
        const userId = localStorage.getItem("id");
        if (!userId) return; 

        try {
            const response = await axios.get(`http://localhost:8080/api/carts`);
            const data = response.data;
            const groupedProducts = groupProducts(data);
            setProducts(groupedProducts);
            calculateTotalMoney(groupedProducts);
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
                productId: itemEdit?.productId
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
    const handleChangeQuantity = (rowData, value) => {
        const updatedProducts = products.map(product => {
            if (product.productId === rowData.productId) {
                product.quantity = value;
                handleUpdateQuantity(product);
            }
            return product;
        });
        setProducts(updatedProducts);
        calculateTotalMoney(updatedProducts);
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    

    const handleRemoveCartItem = async (value) => {
 
        try {
            
            await axios.delete(`http://localhost:8080/api/carts/${value.id}`);
            window.location.reload()
        } catch (error) {

        }
    }

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

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <main className="col-md-9">
                        <div className="card">
                            {products.length > 0 ? (
                                <>
                                    {products.map((row) => (
                                        <table className="table table-borderless table-shopping-cart" key={row.productId}>
                                            <thead className="text-muted">
                                                <tr className="small text-uppercase">
                                                    <th scope="col">Sản phẩm</th>
                                                    <th scope="col" width="120">Số lượng</th>
                                                    <th scope="col" width="120">Giá</th>
                                                    <th scope="col" className="text-right" width="200"> </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <figure className="itemside">
                                                            <div className="aside">
                                                                <img src={`../images/items/${row.thumbnail}`} style={{ width: "100px" }} alt={row.title} />
                                                            </div>
                                                            <figcaption className="info">
                                                                <a href="#" className="title text-dark">{row.title}</a>
                                                            </figcaption>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <div className="quantity-control">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                max="10"
                                                                value={row.quantity}
                                                                onChange={(e) => handleChangeQuantity(row, parseInt(e.target.value))}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="price-wrap">
                                                            <div className="price">${row.price * row.quantity}</div>
                                                            <small className="text-muted"> ${row.price} mỗi cái </small>
                                                        </div>
                                                    </td>
                                                    <td className="text-right">
                                                        <a data-original-title="Lưu vào danh sách yêu thích" title="" href="#" className="btn btn-info" data-toggle="tooltip">
                                                            <i className="fa fa-heart"></i>
                                                        </a>
                                                        <button className="btn btn-light" onClick={() => handleRemoveCartItem(row)}> Xóa</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    ))}
                                    <div className="card-body border-top">
                                        <button className="btn btn-info float-md-right" onClick={handleCheckout}>
                                            Mua hàng <i className="fa fa-chevron-right"></i>
                                        </button>
                                        <button className="btn btn-light" onClick={handleContinueShopping}>
                                            <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="card-body">
                                    <p>Giỏ hàng của bạn trống</p>
                                    <button className="btn btn-light" onClick={handleContinueShopping}>
                                        <i className="fa fa-chevron-left"></i> Tiếp tục mua sắm
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="alert alert-success mt-3">
                            <p className="icontext"><i className="icon text-success fa fa-truck"></i> Giao hàng miễn phí trong 1-2 tuần</p>
                        </div>
                    </main>
                    <aside className="col-md-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Có mã giảm giá?</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="" placeholder="Mã giảm giá" />
                                            <span className="input-group-append">
                                                <button className="btn btn-info">Áp dụng</button>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <dl className="dlist-align">
                                    <dt>Tổng giá:</dt>
                                    <dd className="text-right">${totalPrice}</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Giảm giá:</dt>
                                    <dd className="text-right">$0</dd>
                                </dl>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default Cart;
