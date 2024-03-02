import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout1 from '@/Layouts/AuthenticatedLayout1';
import { Head } from '@inertiajs/react';

export default function CreatePost({auth}) {
    const [values, setValues] = useState({
        name: "",
        price: "",
        description: "",
        categories: "", // Update to 'categories'
        image: null,
        quantity: 0  // Added quantity field
    });

    function handleChange(e) {
        const { id, value, type } = e.target;
        const val = type === 'file' ? e.target.files[0] : value;
        setValues(prevValues => ({
            ...prevValues,
            [id]: val
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('description', values.description);
        formData.append('categories', values.categories); 
        formData.append('image', values.image);
        formData.append('quantity', values.quantity);  // Append quantity field

        try {
            await Inertia.post('/post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Redirect to a success page or perform any other actions
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (<AuthenticatedLayout1  user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
        
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4 p-2 m-3 rounded-md bg-red-200">ADD PRODUCT </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block">Name:</label>
                    <input id="name" type="text" value={values.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>

                <div>
                    <label htmlFor="price" className="block">Price:</label>
                    <input id="price" type="number" value={values.price} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>

                <div>
                    <label htmlFor="description" className="block">Description:</label>
                    <textarea id="description" value={values.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2"></textarea>
                </div>

                <div>
                    <label htmlFor="categories" className="block">Categories:</label>
                    <select id="categories" value={values.categories} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2">
                        <option value="">Select Category</option>
                        <option value="shoes">Shoes</option>
                        <option value="men-clothes">Men's Clothes</option>
                        <option value="women-clothes">Women's Clothes</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="quantity" className="block">Quantity:</label>
                    <input id="quantity" type="number" value={values.quantity} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                </div>

                <div>
                    <label htmlFor="image" className="block">Image:</label>
                    <input id="image" type="file" accept="image/*" onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create</button>
            </form>
        </div></AuthenticatedLayout1>
    );
}
