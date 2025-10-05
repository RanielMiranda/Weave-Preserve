import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-start z-50 pt-20">
            <div className="absolute inset-0 bg-black opacity-30" onClick={onClose}></div>
            <div className="relative bg-white rounded-4xl shadow-lg w-full max-w-lg p-6 z-50">
                <div className="flex justify-between items-center mb-4 rounded-2xl">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
