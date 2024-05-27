import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
 
  const [orders, setOrders] = useState([]);

 

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Lấy danh sách đơn hàng thất bại:", error);
      });
  }, []);

  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">
          <aside className="col-md-3">
            <nav className="list-group">
              <a className="list-group-item" href="/profile/main">
                {" "}
                Account overview{" "}
              </a>
              <a className="list-group-item" href="/profile/address">
                {" "}
                My Address{" "}
              </a>
              <a className="list-group-item active" href="/profile/order">
                {" "}
                My Orders{" "}
              </a>
              <a className="list-group-item" href="/profile/wishlist">
                {" "}
                My wishlist{" "}
              </a>
              <a className="list-group-item" href="/profile/seller">
                {" "}
                My Selling Items{" "}
              </a>
              <a className="list-group-item" href="/profile/setting">
                {" "}
                Settings{" "}
              </a>
            
            </nav>
          </aside>
          <main className="col-md-9">
              {orders.map((row) => (
                  
                    <article className="card mb-4">
              <div className="card-body">
                
                   <div>
                    
                  <div className="row">
                    <div className="col-md-8">
                      <h6 className="text-muted">Delivery to</h6>
                      <p>
                        Name: {row.fullname} </p>
                        <p> Phone: {row.phone_number}</p>
                        <p>  Email: {row.email}</p>
                        <p> Location: {row.address}</p>
                    </div>
                    <div className="col-md-4">
                      <h6 className="text-muted">Payment</h6>
                      <span className="text-success">
                        <i className="fab fa-lg fa-cc-visa"></i>
                        Visa **** 4216
                      </span>
                      <p class="price text-muted">
                       USD {row.total_money}
                      </p>
                    </div>
                  </div>
                  <tr>
                      <td width="65">
                        <img
                          src={require("../../assets/images/items/aocsgo1.jpg")}
                          style={{ width: "80%" }}
                        />
                      </td>
                      <td>
                        <p class="title mb-0">Product name goes here </p>
                        
                      </td>
                      <td> Seller Nike clothing </td>
                      <td width="250">
                        {" "}
                        <a href="#" class="btn btn-outline-primary">
                          Track order
                        </a>
                        <div class="dropdown d-inline-block">
                          <a
                            href="#"
                            data-toggle="dropdown"
                            class="dropdown-toggle btn btn-outline-secondary"
                          >
                            More
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a href="#" class="dropdown-item">
                              Return
                            </a>
                            <a href="#" class="dropdown-item">
                              Cancel order
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </div>
           
              </div>
              </article>
     

))}
               
               </main>   
                
              
           
        </div>
      </div>
    </section>
  );
};

export default Order;
