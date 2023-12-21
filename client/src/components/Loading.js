import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center space-x-2 text-green-500">
                <FaSpinner className="animate-spin text-4xl" />
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
