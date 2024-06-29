import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";

const CSGO = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products with category_id = 4
    GET_ALL(`products/getlatest?categoryid=4`).then((item) => setProducts(item.data));
  }, []);

  return (
    <section className="padding-bottom">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Sản phẩm hot</span>
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
                      <a href={`/detailProduct?productId=${product.id}`} className="item">
                        <div className="card-body">
                          <h6 className="title">{product.title}</h6>
                          <img
                            src={require(`../../assets/images/items/${product.thumbnail}`)}
                            style={{ width: "100%" }}
                            alt={product.title}
                            className="img-fluid"
                          />
                          <div className="price h5 mt-2">${product.price}</div>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <p>No products found for this category.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CSGO;
