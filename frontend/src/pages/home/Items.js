import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";

import { Link } from "react-router-dom";
const Items = (product) => {
  const cardTextStyle = {
    maxWidth: "80%",
  };
  const { productId } = product;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    GET_ALL(`products`).then((item) => setProducts(item.data));
  }, [productId]);
  
  return (
    <div class="container-fluid py-5">
    <div class="text-center">
      <h2 class="section-title">
        <span class="px-2">Bán chạy nhất</span>
      </h2>
    </div>
      <div class="row">
        {products.length > 0 &&
          products.map((row) => (
            <div class="col-xl-3 col-lg-3 col-md-4 col-6 " key={row.id}>
              <div class="card card-product-grid">
                <Link
                  to={`/detailProduct?productId=${row.id}`}
                  class="img-wrap"
                >
                  <img src={`./images/items/${row.thumbnail}`} />{" "}
                </Link>

                <figcaption class="info-wrap">
                  <div>
                    <ul className="rating-stars">
                      <li jstyle={cardTextStyle} className="stars-active">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </li>
                      <li>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                      </li>
                    </ul>
                    <a
                      to={`/detailProduct?productId=${row.id}`}
                      class="title"
                    >
                      <a class="text-muted">{row.category.categoryName}</a>
                      <a  class="title">{row.title}</a>
                      
                    
                    </a>
                  
                  </div>

                  <div class="price h5 mt-2">${row.price}</div>
                </figcaption>
                <div className="card-footer d-flex justify-content-between bg-white border">
                      <a
                        to={`/detailProduct?productId=${row.id}`}
                        className="btn btn-sm text-dark p-0"
                      >
                        <i className="fas fa-eye text-primary mr-1"></i>View
                        Detail
                      </a>
                      <a to={`/detailProduct?productId=${row.id}`}className="btn btn-sm text-dark p-0">
                        <i className="fas fa-shopping-cart text-primary mr-1"></i>
                        Add To Cart
                      </a>
                    </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Items;
