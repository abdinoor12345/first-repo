import { useEffect, useState } from 'react';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';
import { Inertia } from '@inertiajs/inertia';

const Index = ({ products, auth, success }) => {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);

    const handleView = (productId) => {
        window.location.href = `/products/${productId}`;
    };

    const handleAddToCart = async (productId) => {
        try {
            await Inertia.post(route('add_cart', { id: productId, quantity: 1 }));
            alert('Product added to cart successfully');
        } catch (error) {
            alert('Failed to add product to cart');
        }
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <AuthenticatedLayout2
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
                <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
            </h2>}
        >
            <div>
                {success && <p>{success}</p>}
            </div>
            
            <div className="container">
                <h1 className="text-3xl font-bold mb-4 text-blue-900">Products in Stores</h1>
                <form className=' w-1/2' ><input className=' w-full mb-2' type="text" onChange={(e)=>setSearch(e.target.value)} placeholder="SEARCH PRODUCTS by name"/>
                </form> 
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentProducts && currentProducts.filter((product)=>{return search.toLowerCase()===''?product:product.name.toLowerCase().includes(search);}).map((product, index) => (
                        <div key={product.id} className="border border-gray-300 p-4 rounded-lg">
                            <img src={product.image_url} alt={product.name} className="card-image" />
                            <div className="card-body"key={product.id}>
                                <h2 className="card-title text-lg font-bold text-gray-900">{product.name}</h2>
                                <p className="card-price text-green-600">Price: {product.price}</p>
                                <p className="card-description text-gray-700">Description: {product.description}</p>
                                <p className="card-categories text-purple-600">Categories: {product.categories}</p>
                                 
                                <button onClick={() => handleView(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">View Details</button>
                                <button onClick={() => handleAddToCart(product.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Add to Cart</button>
 
                            </div>
                        </div>
                    ))}
                </div>
                {products.length > productsPerPage &&
                    <div className="flex justify-center mt-4">
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={() => paginate(currentPage - 1)}>Previous</button>
                        <button className="bg-blue-800 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-r mx-2" onClick={() => paginate(currentPage + 1)}>More</button>
                    </div>
                }
            </div>
        </AuthenticatedLayout2>
    );
};

export default Index;
