import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link } from "react-router-dom";

const Mixi = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products with category_id = 1
    GET_ALL(`products/getlatest?categoryid=4`).then((item) =>
      setProducts(item.data)
    );
    // Fetch all categories
    GET_ALL(`categories`).then((item) => setCategories(item.data));
  }, []);
  const handleProductClick = (productId) => {
    window.location.href = `/detailProduct?productId=${productId}`;
  };

  return (
    <section className="padding-y">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <h3 className="title-section">
            {categories.length > 0 ? categories[3].categoryName : ""}
          </h3>
        </h2>
      </div>
      <div className="container">
        <div className="card card-home-category">
          <div className="row no-gutters">
            <div className="col-md">
              <ul className="row no-gutters bordered-cols">
                {products.length > 0 ? (
                  products.map((product) => (
                    <li className="col-6 col-lg-3 col-md-4" key={product.id}>
                      <div>
                        <div
                          onClick={() => handleProductClick(product.id)}
                          style={{ cursor: "pointer" }}
                          className="item"
                        >
                          <div className="card-body">
                            <h6 className="text-truncate mb-3">
                              {product.title}
                            </h6>
                            <img
                              src={require(`../../assets/images/items/${product.thumbnail}`)}
                              style={{ width: "100%" }}
                              alt={product.title}
                              className="img-fluid"
                            />
                            <div className="price h5 mt-2">
                              ${product.price}
                            </div>
                          </div>
                        </div>
                        <div className="card-footer d-flex justify-content-between bg-light border mt-2">
                          <button
                            className="btn btn-sm text-dark p-0"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <i className="fas fa-eye text-primary mr-1"></i>View
                            Detail
                          </button>
                          <a href="" className="btn btn-sm text-dark p-0">
                            <i className="fas fa-shopping-cart text-primary mr-1"></i>
                            Add To Cart
                          </a>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>No products found for this category.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
        <Link
          to="/listing?categoryId=1"
          className="btn btn-primary float-md-right"
        >
          Xem thêm
        </Link>
      </div>
    </section>
  );
};

export default Mixi;
