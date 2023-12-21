import React from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';

const Alert = () => {
    const { alertText, alertType, showAlert } = useAppContext();
    const getIcon = () => {
        switch (alertType) {
            case 'danger':
                return <FaExclamationTriangle className="text-red-500 mr-2" />;
            case 'success':
                return <FaCheckCircle className="text-green-500 mr-2" />;
            default:
                return null;
        }
    };

    return (
        <div className={`fixed bottom-4 right-4 ${showAlert ? 'block' : 'hidden'} z-50`}>
            <div
                className={`bg-white border border-gray-300 shadow-md rounded p-4 flex items-center ${alertType === 'danger' ? 'text-red-600' : 'text-green-600'
                    }`}
            >
                {getIcon()}
                <span>{alertText}</span>
            </div>
        </div>
    );
};

export default Alert;