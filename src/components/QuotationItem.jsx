import React from 'react';
import { Trash2 } from 'lucide-react';

const QuotationItem = ({ item, index, onChange, onRemove }) => {
    const handleChange = (field, value) => {
        onChange(item.id, field, value);
    };

    const handlePriceChange = (e) => {
        const rawValue = e.target.value;
        // Remove thousands separators (dots) and replace decimal comma with a dot
        const cleanedValue = rawValue.replace(/\./g, '').replace(/,/g, '.');
        const parsedValue = parseFloat(cleanedValue);
        handleChange('price', isNaN(parsedValue) ? 0 : parsedValue);
    };

    return (
        <div className="grid grid-cols-12 gap-0 border-b-2 border-white text-gray-800 bg-gray-200 hover:bg-white transition-colors">
            {/* Number */}
            <div className="col-span-1 flex items-center justify-center border-r-2 border-white p-4 font-bold text-gray-600 bg-gray-400">
                {index + 1}
            </div>

            {/* Service / Description */}
            <div className="col-span-6 p-4 border-r-2 border-white flex flex-col justify-center">
                <input
                    type="text"
                    value={item.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                    className="font-bold text-lg bg-transparent border-none focus:ring-0 p-0 text-gray-800 placeholder-gray-500 w-full"
                    placeholder="Nombre del Servicio"
                />
                <textarea
                    value={item.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="text-xs text-gray-600 mt-1 bg-transparent border-none focus:ring-0 p-0 w-full resize-none overflow-hidden"
                    placeholder="Descripción del servicio..."
                    rows={2}
                    style={{ minHeight: '40px' }}
                />
            </div>

            {/* Time */}
            <div className="col-span-2 flex items-center justify-center border-r-2 border-white p-2 bg-gray-200">
                <input
                    type="text"
                    value={item.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    className="text-center bg-transparent border-none focus:ring-0 w-full font-medium text-gray-700"
                    placeholder="Ej: 2-3 días"
                />
            </div>

            {/* Price */}
            <div className="col-span-3 flex items-center justify-between p-4 bg-gray-200 relative group">
                <span className="text-gray-500 font-bold">$</span>
                <input
                    type="text"
                    value={item.price === 0 ? '' : item.price.toLocaleString('es-CL')}
                    onChange={handlePriceChange}
                    className="text-right font-bold text-lg bg-transparent border-none focus:ring-0 w-full text-gray-800"
                    placeholder="0"
                />

                <button
                    onClick={() => onRemove(item.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity p-1"
                    title="Eliminar item"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

export default QuotationItem;
