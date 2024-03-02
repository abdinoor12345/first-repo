import React, { useState } from 'react';
import Product from './Products/SearchProduct'; // Assuming you have a Product component

const Search = ({ products }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        try {
            const response = await fetch(`/searchProducts?query=${inputValue}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            // No need to store search results in state, use products prop directly
            // setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div>
            <h1>Search</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={handleSearch}
            />
            <ul>
                {/* Use products prop directly instead of searchResults state */}
                {products && products.map(product => (
        <Product key={product.id} product={product} />
    ))}
            </ul>
        </div>
    );
};

export default Search;
