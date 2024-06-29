import React, { useEffect, useState } from "react";
import { GET_ALL } from "../api/apiService";
import { Link } from "react-router-dom";


const CSGO = () => {
	const cardTextStyle = {
	  maxWidth: "80%",
	};
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	useEffect(() => {
		// Fetch products with category_id = 4
		GET_ALL(`products/getlatest?categoryid=3`).then((item) => setProducts(item.data));
	  }, []);
	  useEffect(() => {
		GET_ALL(`categories`).then((item) => setCategories(item.data));
	  }, []);
  
	return (
		<section className="padding-bottom">
		<div className="text-center mb-4">
		<h3 className="title-section">
            {categories.length > 0 ? categories[2].categoryName : ""}
          </h3>
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
				<Link to="/listing?categoryId=3" className="btn btn-primary">
                Xem thêm
              </Link>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
);
}
export default CSGO