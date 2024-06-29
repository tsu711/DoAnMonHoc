import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import "./LoadProduct.css";

const cardTextStyle = {
  maxWidth: "80%",
};

const LoadProduct = ({ categoryName, categoryId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    GET_ALL(`products/getlatest?categoryid=${categoryId}`).then((item) =>
      setProducts(item.data)
    );
  }, [categoryId]);

  const handleProductClick = (productId) => {
    window.location.href = `/detailProduct?productId=${productId}`;
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="padding-y">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          {products.length > 0 && (
            <a href={`/listing?categoryId=${categoryId}`}>
              <h3 className="title-section"> {categoryName} </h3>
              
            </a>
            
          )}
        </h2>
      </div>
      <div className="row">
        {products.length > 0 &&
          products.map((row) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-6" key={row.id}>
              <div className="card card-product-grid">
                <div
                  className="img-wrap"
                  onClick={() => handleProductClick(row.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span className="badge badge-danger"> MỚI </span>
                  <img
                    src={`./images/items/${row.thumbnail}`}
                    alt={row.title}
                    className="img-fluid"
                  />
                </div>
                <figcaption className="info-wrap">
                  {/* <div className="rating-stars mb-1">
                    <ul className="rating-stars">
                      <li style={cardTextStyle} className="stars-active">
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
                  </div> */}
                  <div>
                    <span
                      className="title"
                      onClick={() => handleProductClick(row.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {row.title}
                    </span>
                  </div>
                  <div className="price h5 mt-2">
                    {formatPrice (row.price)}
                  </div>
                </figcaption>
                {/* <div className="card-footer d-flex justify-content-between bg-white border mt-2">
                  <button
                    className="btn btn-sm text-dark p-0"
                    onClick={() => handleProductClick(row.id)}
                  >
                    <i className="fas fa-eye text-primary mr-1"></i>View Detail
                  </button>
                  <button
                    className="btn btn-sm text-dark p-0"
                    onClick={() => handleProductClick(row.id)}
                  >
                    <i className="fas fa-shopping-cart text-primary mr-1"></i>
                    Add To Cart
                  </button>
                </div> */}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default LoadProduct;
