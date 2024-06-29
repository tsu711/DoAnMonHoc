import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link } from "react-router-dom";

const Mixi = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products with category_id = 1
    GET_ALL(`products/getlatest?categoryid=3`).then((item) =>
      setProducts(item.data)
    );
    // Fetch all categories
    GET_ALL(`categories`).then((item) => setCategories(item.data));
  }, []);

  return (
    <section className="padding-y">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <h3 className="title-section">
            {categories.length > 0 ? categories[2].categoryName : ""}
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
                      <Link
                        to={`/detailProduct?productId=${product.id}`}
                        className="item"
                      >
                        <div className="card-body">
						<h6 className="text-truncate mb-3">{product.title}</h6>
                          <img
                            src={require(`../../assets/images/items/${product.thumbnail}`)}
                            style={{ width: "100%" }}
                            alt={product.title}
                            className="img-fluid"
                          />
                          <div className="price h5 mt-2">${product.price}</div>
                        </div>
                      </Link>
					  <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link
                    to={`/detailProduct?productId=${product.id}`}
                    className="btn btn-sm text-dark p-0"
                  >
                    <i className="fas fa-eye text-primary mr-1"></i>View Detail
                  </Link>
                  <Link
                    to="/cart"
                    className="btn btn-sm text-dark p-0"
                  >
                    <i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                  </Link>
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
        <Link to="/listing?categoryId=1" className="btn btn-primary float-md-right">
                Xem thêm
              </Link>
      </div>
    </section>
  );
};

export default Mixi;
