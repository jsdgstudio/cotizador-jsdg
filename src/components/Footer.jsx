import React from 'react';

const Footer = ({ subtotal, iva, total }) => {
    return (
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-end text-gray-400 text-sm">
            <div className="w-full md:w-auto mb-4 md:mb-0">
                {/* Placeholder for left side content if any, or just spacing */}
            </div>

            <div className="flex flex-col items-end">
                <div className="bg-gray-500 h-24 w-24 mb-2 flex items-center justify-center text-xs text-center text-white p-1">
                    QR Code Placeholder
                </div>
            </div>
        </footer>
    );
};

export default Footer;
