import { inertia } from '@inertiajs/inertia';
import AuthenticatedLayout2 from '@/Layouts/AuthenticatedLayout2';
import React, { useState, useEffect } from 'react';

const OffersData = ({ offers, auth }) => {
    const [countdowns, setCountdowns] = useState({});
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        const timers = {};

        offers.forEach(offer => {
            const expirationDate = new Date(offer.expiration_date);
            timers[offer.id] = setInterval(() => {
                const now = new Date();
                const difference = expirationDate - now;

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setCountdowns(prevState => ({
                        ...prevState,
                        [offer.id]: `${days}d ${hours}h ${minutes}m ${seconds}s`
                    }));
                } else {
                    setCountdowns(prevState => ({
                        ...prevState,
                        [offer.id]: 'Expired'
                    }));
                    clearInterval(timers[offer.id]);
                }
            }, 1000);
        });

        return () => {
            Object.values(timers).forEach(timer => clearInterval(timer));
        };
    }, [offers]);
    const handleAddToCart = async (singleOfferid) => {
        try {
            await Inertia.post(route('offers_cart', { id: singleOfferid, quantity }));
            alert('Product added to cart successfully');
        } catch (error) {
            alert('Failed to add product to cart');
        }
    };

    return (
        <>
            <AuthenticatedLayout2
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight rounded-lg ">
                    <a href="/" className='rounded-lg ring-2 p-2  bg-sky-400 opacity-100 hover:bg-red-800 '>TRENDINGS</a>
                </h2>}
            >
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4">MEN WEAR</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {offers.map((singleOffer, index) => (
                            <div key={index} className="bg-white p-4 shadow-md rounded-lg">
                                <img src={singleOffer.image_url} alt={singleOffer.name} className="w-full mb-4" />
                                <div className="text-lg font-semibold mb-2">: {singleOffer.name}</div>
                                <div className="text-green-600 mb-2">ksh: {singleOffer.price}</div>
                                <div className="text-blue-500">{singleOffer.description}</div>
                                <div className="text-green-600 mb-2">KSH: {singleOffer.discount}</div>
                                <div className="text-green-500">KSH: {singleOffer.total_price}</div>
                                <div className="text-pink-600 mb-2">category: {singleOffer.categories}</div>
                                <div className="text-red-500">DATE: {singleOffer.expiration_date}</div>
                                <div className="text-red-500">REMAINING TIME: {countdowns[singleOffer.id]}</div>
                                <button onClick={() => handleAddToCart(singleOffer.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Add to Cart</button>
 
                            </div>
                        ))}
                    </div>
                </div>
            </AuthenticatedLayout2>
        </>
    );
};

export default OffersData;
