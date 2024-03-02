import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import html2pdf from 'html2pdf.js';

const Show = ({ product, auth }) => {
    console.log('Product:', product); // Add this line to log the product prop

    const handleDownloadPDF = () => {
        const element = document.getElementById('productDetails');

        html2pdf()
            .from(element)
            .set({ margin: 1, filename: 'product_details.pdf', image: { type: 'jpeg', quality: 0.98 } })
            .save();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
                <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
            </h2>}
        >
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl" id="productDetails">
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                <img src={product.image_url} alt={product.name} className="mb-4 rounded-lg" style={{ maxWidth: '100%' }} />
                <p className="text-gray-700 mb-2"><span className="font-bold">Description:</span> {product.description}</p>
                <p className="text-gray-700 mb-2"><span className="font-bold">Price:</span> {product.price}</p>
                <p className="text-gray-700 mb-2"><span className="font-bold">Categories:</span> {product.categories}</p>
                {/* Other product details */}
                <button onClick={handleDownloadPDF} className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2">Download PDF</button>

            </div>
         </AuthenticatedLayout>
    );
};

export default Show;
