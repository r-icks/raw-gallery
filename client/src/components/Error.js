import React from 'react';
import Alert from './Alert';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <Alert />
            <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-600 mb-8">There was an error loading the images.</p>
        </div>
    );
};

export default Error;
