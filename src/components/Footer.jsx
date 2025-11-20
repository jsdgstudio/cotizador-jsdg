import React from 'react';
import { Linkedin } from 'lucide-react';

const Footer = ({ subtotal, iva, total }) => {
    return (
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-end text-gray-400 text-sm">
            <div className="w-full md:w-auto mb-4 md:mb-0 flex gap-4">
                <a
                    href="https://www.linkedin.com/in/jssdg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <Linkedin size={24} />
                </a>
                <a
                    href="https://www.behance.net/jaimesilva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors font-bold text-xl flex items-center"
                >
                    Be
                </a>
            </div>

            <div className="flex flex-col items-end">
                {/* QR Code Removed as requested */}
            </div>
        </footer>
    );
};

export default Footer;
