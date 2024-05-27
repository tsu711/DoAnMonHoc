    import React, { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { useNavigate } from "react-router-dom";

    const Cart = () => {
        const [products, setProducts] = useState([]);
        const [totalPrice, setTotalPrice] = useState(0);
    const navigative=useNavigate()
        // Retrieve data from localStorage when the component mounts
        useEffect(() => {
            const storedCartItems = localStorage.getItem("cartItems") || "[]";
            const parsedCartItems = JSON.parse(storedCartItems);
            setProducts(parsedCartItems);
            const calculatedTotalPrice = parsedCartItems.reduce(
                (total, product) => total + product.price * product.quantity,
                0
              );
              setTotalPrice(calculatedTotalPrice);
        }, []); // The empty dependency array ensures this effect runs only once on mount
        const handleRemoveCartItem = (productId) => {
            // Filter out the item with the given productId
            const updatedCartItems = products.filter((item) => item.id !== productId);

            // Update state and localStorage with the new cart items
            setProducts(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        };
        const handleUpdateQuantity = (productId, newQuantity) => {
            const updatedCartItems = products.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );

            setProducts(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            window.location.reload();
        };

        // Function to increase the quantity
        const handleIncreaseQuantity = (productId, currentQuantity) => {
            handleUpdateQuantity(productId, currentQuantity + 1);
        };

        // Function to decrease the quantity
        const handleDecreaseQuantity = (productId, currentQuantity) => {
            if (currentQuantity > 1) {
                handleUpdateQuantity(productId, currentQuantity - 1);
            }
        };

        
        const handleCheckout = () => {
            // Thực hiện xử lý thanh toán ở đây (ví dụ: gửi đơn hàng đến server)
            // Sau khi thanh toán thành công, cập nhật giỏ hàng và điều hướng người dùng đến trang thanh toán
            // setCartItems([]);
            // localStorage.removeItem("cartItems");
            
            navigative("/formcart"); // Điều hướng đến trang thanh toán
        };
        const handleContinueShopping = () => {
            // Điều hướng người dùng về trang chủ hoặc trang sản phẩm khi nhấp vào "Continue shopping"
            navigative("/");
        };
        return (
            <section class="section-content padding-y">
                <div class="container">

                    <div class="row">
                        <main class="col-md-9">
                            <div class="card">
                                {products.length > 0 &&
                                    products.map((row) => (<table class="table table-borderless table-shopping-cart">
                                        <thead class="text-muted">
                                            <tr class="small text-uppercase">
                                                <th scope="col">Product</th>
                                                <th scope="col" width="120">Quantity</th>
                                                <th scope="col" width="120">Price</th>
                                                <th scope="col" class="text-right" width="200"> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
    <tr>
                                                <td>
                                                    <figure class="itemside">
                                                        <div class="aside">
                                                        <img src={`../images/items/${row.thumbnail}`} style={{width:"100px"}} />
                                                            </div>
                                                        <figcaption class="info">
                                                            <a href="#" class="title text-dark">{row.title}</a>
                                                            
                                                        </figcaption>
                                                    </figure>
                                                </td>
                                                <td>
                                                    <div class="quantity-control">
                                                        <button
                                                            onClick={() => handleDecreaseQuantity(row.id, row.quantity)}
                                                            class="btn btn-outline-secondary btn-sm"
                                                        >
                                                            -
                                                        </button>
                                                        <span class="quantity">{row.quantity}</span>
                                                        <button
                                                            onClick={() => handleIncreaseQuantity(row.id, row.quantity)}
                                                            class="btn btn-outline-secondary btn-sm"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div class="price-wrap">
                                                        <var class="price">${row.price * row.quantity}</var>
                                                        <small class="text-muted"> ${row.price} each </small>
                                                    </div>
                                                </td>
                                                <td class="text-right">
                                                    <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-info" data-toggle="tooltip"> <i class="fa fa-heart"></i></a>
                                                    <a href="" class="btn btn-light" onClick={() => handleRemoveCartItem(row.id)}> Remove</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
    ))}
                            <div className="card-body border-top">
                            {products.length > 0 && (
                    <Link to="/formcart" className="btn btn-info float-md-right" onClick={handleCheckout}>
                    Mua hàng <i className="fa fa-chevron-right"></i>
                    </Link>
                )}
                    <button className="btn btn-light" onClick={handleContinueShopping}>
                    <i className="fa fa-chevron-left"></i> Continue shopping
                    </button>
                </div>
                            </div>

                            <div class="alert alert-success mt-3">
                                <p class="icontext"><i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks</p>
                            </div>

                        </main>
                        <aside class="col-md-3">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <form>
                                        <div class="form-group">
                                            <label>Have coupon?</label>
                                            <div class="input-group">
                                                <input type="text" class="form-control" name="" placeholder="Coupon code" />
                                                <span class="input-group-append">
                                                    <button class="btn btn-info">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <dl class="dlist-align">
                                        <dt>Total price:</dt>
                                        <dd class="text-right">${totalPrice}</dd>
                                    </dl>
                                    <dl class="dlist-align">
                                        <dt>Discount:</dt>
                                        <dd class="text-right">$0</dd>
                                    </dl>
                                

                                  

                                </div>
                            </div>
                        </aside>
                    </div>

                </div>
            </section>)

    };

    export default Cart