import React from 'react';
import { Link } from 'react-router-dom';


const SearchResults = ({ results }) => (
  <table className="search-results-table ms-3">
    <tbody>
      {results.slice(0, 5).map((result) => {
        console.log('Result:', result); // Log để kiểm tra giá trị của result
        return (
          <tr key={result.id} className="search-result-row">
            <td className="image-cell">
              <Link to={`/detailProduct?productId=${result.id}`}>
                <img src={`./images/items/${result.thumbnail}`} alt={`Thumbnail for ${result.title}`} style={{ height: '100px' }}/>
              </Link>
            </td>
            <td className="info-cell mt-4">
              <div className='title'>{result.title}</div>
              <div className='price'>{result.price}$</div>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default SearchResults;