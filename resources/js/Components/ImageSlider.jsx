import React, { useEffect, useState } from 'react';

const ImageSlider = () => {
    const [showFirstImage, setShowFirstImage] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowFirstImage(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowFirstImage(prevState => !prevState);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []); // Run once when component mounts

    return (
        <div className="w-screen adivasi">
            <div className="flex items-center justify-center h-screen">
                {showFirstImage ? (
                    <img
                        src="/logo/fashion.jpg"
                        alt="First Image"
                        className="opacity-100 animate-fade-in object-cover h-full w-full rounded-lg shadow-lg animate-glow ring-4"
                    />
                ) : (
                    <img
                        src="/logo/logo1.jpg"
                        alt="Second Image"
                        className="brightness-125 opacity-1000 animate-fade-in object-cover h-full w-full rounded-lg shadow-lg animate-glow ring-2"
                    />
                )}
            </div>
        </div>
    );
};

export default ImageSlider;
