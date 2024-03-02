import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout1 from '@/Layouts/AuthenticatedLayout1';

const Edit = ({ product ,auth}) => {
    const [formData, setFormData] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        categories: product.categories, // Convert array to string
        image: null, // Add image field to formData
        // Add other fields as needed
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const newValue = name === 'image' ? files[0] : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'image' && formData[key] === null) {
                continue; // Skip if image is not selected
            }
            formDataToSend.append(key, formData[key]);
        }
        // Send form data to update route
        Inertia.post(route('products.update', product.id), formDataToSend);
    };

    return (
        <AuthenticatedLayout1
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
            <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
        </h2>}
    >            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-blue-900">Edit Product</h1>
                <div className="mb-4">
                    {product.image_url && <img src={product.image_url} alt={product.name} className="mb-4 rounded-lg" style={{ maxWidth: '100%' }} />}
                    <input type="file" id="image" name="image" accept="image/*" onChange={handleChange} className="border rounded-lg px-3 py-2 w-full" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="border rounded-lg px-3 py-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border rounded-lg px-3 py-2 w-full"></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price:</label>
                        <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="border rounded-lg px-3 py-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="categories" className="block text-gray-700 font-bold mb-2">Categories:</label>
                        <input type="text" id="categories" name="categories" value={formData.categories} onChange={handleChange} className="border rounded-lg px-3 py-2 w-full" />
                    </div>
                    {/* Add other fields as needed */}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Update</button>
                </form>
            </div>
        </AuthenticatedLayout1>
    );
};

export default Edit;
