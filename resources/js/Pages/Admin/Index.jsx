import { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout1 from '@/Layouts/AuthenticatedLayout1';

const Index = ({ products, auth }) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(4);

    const handleDelete = (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            Inertia.delete(route('products.destroy', productId));
        }
    };

    const handleView = (productId) => {
        window.location.href = `/products/${productId}`;
    };

    const handleUpdate = (productId) => {
        window.location.href = `/products/${productId}/edit`;
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.filter((product) => {
        return search.toLowerCase() === '' ? product : product.name.toLowerCase().includes(search);
    }).slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout1
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
                    <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
                </h2>
            }
        >
            <div className="container">
                <h1 className="text-3xl font-bold mb-4 text-blue-900">Products..in..Stores</h1>
                <form className='w-1/2'><input className='w-full mb-2' type="text" onChange={(e) => setSearch(e.target.value)} placeholder="SEARCH PRODUCTS by name" /></form>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {currentProducts.map(product => (
                        <div key={product.id} className="border border-gray-300 p-4 rounded-lg">
                            <img src={product.image_url} alt={product.name} className="card-image" />
                            <div className="card-body">
                                <h2 className="card-title text-lg font-bold text-gray-900">{product.name}</h2>
                                <p className="card-price text-green-600">Price: {product.price}</p>
                                <p className="card-description text-gray-700">Description: {product.description}</p>
                                <p className="card-categories text-purple-600">Categories: {product.categories}</p>
                                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded-md mt-2">Delete</button>
                                <button onClick={() => handleView(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">View Details</button>
                                <button onClick={() => handleUpdate(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Update Details</button>
                            </div>
                        </div>
                    ))}
                </div>
                {products.length > productsPerPage &&
                    <div className="flex justify-center mt-4">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => paginate(currentPage - 1)}>Previous</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={() => paginate(currentPage + 1)}>Next</button>
                    </div>
                }
            </div>
        </AuthenticatedLayout1>
    );
};

export default Index;
