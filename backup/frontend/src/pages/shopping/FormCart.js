import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { POST_ADD } from "../api/apiService";

const style = { layout: "vertical" };

const FormCart = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  
  // State variables
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [listProduct, setListProduct] = useState([]);
  const [order, setOrder] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    size: "",
    color: "",
    order_date: "", // Initialize with current date?
    total_money: "",
    thumbnail: "",
    shipping_method: "cod",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // PayPal button component
  const ButtonWrapper = ({ currency, showSpinner, amount }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style, currency, amount]}
          fundingSource={undefined}
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            }).then((orderId) => orderId)
          }
          onApprove={(data, actions) =>
            actions.order.capture().then(async (response) => {
              console.log(response);
              if (response.status === "COMPLETED") {
                // Handle post-approval logic here
                navigate("/");
              }
            })
          }
        />
      </>
    );
  };

  // Fetch user and cart data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        const userData = response.data;
        setOrder((prevData) => ({
          ...prevData,
          email: userData.email || "",
          fullname: userData.fullname || "",
          address: userData.address || "",
          phone_number: userData.phone_number || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchCartData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/carts?userId=${userId}`);
        const cartItems = response.data;

        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];

        const totalMoney = cartItems.reduce(
          (accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity,
          0
        );
        const thumbnails = cartItems.map((item) => item.thumbnail);

        setOrder((prevData) => ({
          ...prevData,
          thumbnail: thumbnails.join(", "),
          total_money: totalMoney,
          order_date: formattedDate,
        }));
        setListProduct(cartItems);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    

    fetchUserData();
    fetchCartData();
  }, [userId]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { address, fullname, email, phone_number } = order;
    if (address && fullname && email && phone_number) {
      try {
        const orderDetails = listProduct.map((item) => ({
          product:  { "id": item.productId },
          priceOrder: item.price,
          quantity: item.quantity,
          // Optionally include color and size if needed
          // color: item.color,
          // size: item.size,
        }));

        const searchObj = {
          
          fullname: order.fullname,
          thumbnail: order.thumbnail,
          email: order.email,
          totalMoney: listProduct.reduce((sum, item) => item.price * item.quantity + sum, 0),
          phoneNumber: order.phone_number,
          address: order.address, 
          orderDate:order.order_date,
          status: paymentMethod === 'cod' ? 'Chưa thanh toán' : 'Đã thanh toán',
          paymentMethod,
          userId,
          orderDetails: orderDetails,
          listIdCart: listProduct.map((item) => item.id),
       
         
          
         
        };
        console.log("Payload before sending:", searchObj);
        await POST_ADD("orders", searchObj);
        alert("thanh toán thành công")
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin thanh toán');
    }
  };

  return (
    <div className="container">
      <h2>Thông tin đặt hàng</h2>
      <form onSubmit={handleSubmit} method="POST">
        <div className="form-group">
          <label htmlFor="fullname">Họ và tên:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="form-control"
            value={order.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={order.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone_number">Số điện thoại:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="form-control"
            value={order.phone_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ giao hàng:</label>
          <textarea
            id="address"
            name="address"
            className="form-control"
            value={order.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size:</label>
          <input
            type="text"
            id="size"
            name="size"
            className="form-control"
            value={order.size}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            className="form-control"
            value={order.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="order_date">Ngày đặt hàng:</label>
          <input
            type="date"
            id="order_date"
            name="order_date"
            className="form-control"
            value={order.order_date}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="total_money">Tổng số tiền:</label>
          <input
            type="text"
            id="total_money"
            name="total_money"
            className="form-control"
            value={order.total_money}
            onChange={handleChange}
            readOnly
          />
        </div>

      
        
        <div className="form-group">
          <label htmlFor="shipping_method">Phương thức thanh toán:</label>
          <select
            id="shipping_method"
            name="shipping_method"
            className="form-control"
            value={order.shipping_method}
            onChange={handleChange}
          >
            <option value="cod">COD</option>
            <option value="payment">Payment</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Đặt hàng
        </button>
        {order.shipping_method === "payment" && (
          <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider
              options={{
                clientId: "YOUR_PAYPAL_CLIENT_ID",
                components: "buttons",
                currency: "USD",
              }}
            >
              <ButtonWrapper currency={"USD"} amount={order.total_money} showSpinner={false} />
            </PayPalScriptProvider>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormCart;
