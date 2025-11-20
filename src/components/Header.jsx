import React from 'react';
import logo from '../assets/JSDG-01.svg';

const Header = () => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-0">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
                <img src={logo} alt="JSDG Logo" className="h-16 w-auto" />
                <span className="text-4xl font-bold text-white tracking-wider">JSDG</span>
            </div>
            <div className="border rounded-full px-6 py-2 text-sm md:text-base tracking-wider text-gray-300" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
                +56 9 7107 5121 | jsdg.studio@gmail.com
            </div>
        </header>
    );
};

export default Header;
