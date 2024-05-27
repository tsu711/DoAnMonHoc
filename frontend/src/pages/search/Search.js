import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
// import SearchResultPage from "./SearchResultPage";
import { GET_PAGE } from "../api/apiService";

const Search = () => {
	const  navigate=useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	// const [SearchResultPage, SearchResultPage] = useState([]);
	const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleSearchChange = async (event) => {
		const input = event.target.value;
		setSearchQuery(input);

		try {
			if (!input.trim()) {
				setSearchResults([]);
				setDropdownOpen(false);
			} else {
				const productResponse = await axios.get(`http://localhost:8080/api/products`);
				const products = productResponse.data;
				setSearchResults(products.filter((item) =>
					item.title?.toLowerCase().includes(input.toLowerCase())
				));
				setDropdownOpen(true);
			}
		} catch (error) {
			console.error('Error during search:', error);
		}
	};
	const handleSearchSubmit = async (event) => {
		event.preventDefault(); // Ngăn chặn hành vi mặc định của form
	
		try {
		  // Fetch dữ liệu sản phẩm ngay tại đây
		  const nextPage = 1;
		  const productResponse = await GET_PAGE(
			'products',
			nextPage - 1,
			10,
			null,
			null,
			searchQuery
		  );
	
		  const products = productResponse.data;
	
		  // Thực hiện filter trên dữ liệu
		  const filteredProducts = products.filter((item) =>
			item.title?.toLowerCase().includes(searchQuery.toLowerCase())
		  );
	
		  setSearchResults(filteredProducts);
		 
	
		  // Chuyển hướng đến trang SearchPage với query
		  navigate(`/search-page?q=${searchQuery}`);
		  setDropdownOpen(false);
		} catch (error) {
		  console.error('Lỗi trong quá trình tìm kiếm:', error);
		}
	  };
        
		
  

    return (
        <div class="col-xl-6 col-lg-5 col-md-6">
      
        {isDropdownOpen && (
								<div
									style={{
										position: 'absolute',
										top: '100%',
										left: 0,
										zIndex: 100,
										backgroundColor: 'white',
										border: '1px solid #ccc',
										borderRadius: '8px', // Add border-radius for a rounded lookoverflow: 'hidden', // Hide overflow to keep it within the rounded border
										boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
									}}
								>
									<SearchResults results={searchResults} />
								</div>
							)}
<div className="input-group w-100">
									<input
										type="text"
										className="form-control"
										placeholder="Search"
										value={searchQuery}
										onChange={handleSearchChange}
									/>
									<div className="input-group-append" onClick={handleSearchSubmit}>
										<button className="btn btn-dark" type="submit">
											<i className="fa fa-search"></i> Search
										</button>
									</div>
								</div>
      </div>
        
    );
    };

export default Search;
