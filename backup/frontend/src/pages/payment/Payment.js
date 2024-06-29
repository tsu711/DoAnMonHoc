import React, { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [paymentUrl, setPaymentUrl] = useState(""); // State to hold payment URL

  const handlePayment = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/payment/create_payment");
      const { status, messenge, url } = response.data;
      if (status === "OK" && url) {
        setPaymentUrl(url); // Set payment URL to state
      } else {
        alert("Failed to retrieve payment URL: " + messenge);
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("An error occurred while creating the payment");
    }
  };

  // Redirect to payment URL if available
  if (paymentUrl) {
    window.location.href = paymentUrl;
  }

  return (
    <section className="section-content padding-y">
      <div className="container" style={{ maxWidth: "720px" }}>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-3">Delivery info</h4>
            <div className="form-row">
              <div className="col form-group">
                <label>Full name</label>
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
            <div className="form-row">
              <div className="col form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="" />
              </div>
              <div className="col form-group">
                <label>Phone</label>
                <input type="text" className="form-control" placeholder="" />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea className="form-control" rows="2"></textarea>
            </div>
          </div>
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-4">Payment</h4>
            <form role="form" style={{ maxWidth: "380px" }}>
              <div className="form-group">
                <label htmlFor="username">Name on card</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Ex. John Smith"
                  required=""
                />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card number</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    placeholder=""
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="fab fa-cc-visa"></i> &nbsp;{" "}
                      <i className="fab fa-cc-amex"></i> &nbsp;
                      <i className="fab fa-cc-mastercard"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md flex-grow-0">
                  <div className="form-group">
                    <label className="hidden-xs">Expiration</label>
                    <div className="form-inline" style={{ maxWidth: "200px" }}>
                      <select className="form-control" style={{ width: "100px" }}>
                        <option>MM</option>
                        <option>01 - January</option>
                        <option>02 - February</option>
                        <option>03 - March</option>
                      </select>
                      <span style={{ width: "20px" }}> / </span>
                      <select className="form-control" style={{ maxWidth: "100px" }}>
                        <option>YY</option>
                        <option>2022</option>
                        <option>2023</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <label
                      data-toggle="tooltip"
                      title="3 digits code on back side of the card"
                    >
                      CVV <i className="fa fa-question-circle"></i>
                    </label>
                    <input className="form-control" required="" type="text" />
                  </div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-block"
                type="button"
                onClick={handlePayment}
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
