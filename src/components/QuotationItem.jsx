import React from 'react';
import { Trash2 } from 'lucide-react';

const QuotationItem = ({ item, index, onChange, onRemove }) => {
    const handleChange = (field, value) => {
        onChange(item.id, field, value);
    };

    const formatCurrency = (value) => {
        // Simple formatter, can be improved
        return value;
    };

    return (
        <div className="grid grid-cols-12 gap-0 border-b border-gray-300 last:border-b-0 text-gray-800 bg-white/90 hover:bg-white transition-colors">
            {/* Number */}
            <div className="col-span-1 flex items-center justify-center border-r border-gray-300 p-4 font-bold text-gray-600 bg-gray-400/20">
                {index + 1}
            </div>

            {/* Service / Description */}
            <div className="col-span-6 border-r border-gray-300 p-4 flex flex-col justify-center">
                <input
                    type="text"
                    placeholder="Servicio (ej. Reunión inicial)"
                    className="font-bold text-gray-800 placeholder-gray-400 bg-transparent border-none focus:ring-0 p-0 w-full mb-1"
                    value={item.service}
                    onChange={(e) => handleChange('service', e.target.value)}
                />
                <textarea
                    placeholder="Descripción del servicio..."
                    className="text-sm text-gray-600 placeholder-gray-400 bg-transparent border-none focus:ring-0 p-0 w-full resize-none"
                    rows={2}
                    value={item.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                />
            </div>

            {/* Time */}
            <div className="col-span-2 border-r border-gray-300 p-4 flex items-center justify-center font-bold text-gray-700">
                <input
                    type="text"
                    placeholder="ej. 1-2 días"
                    className="text-center bg-transparent border-none focus:ring-0 w-full"
                    value={item.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                />
            </div>

            {/* Price */}
            <div className="col-span-3 p-4 flex items-center justify-between font-bold text-gray-700 relative group">
                <span className="mr-1">$</span>
                <input
                    type="number"
                    placeholder="0"
                    className="text-right bg-transparent border-none focus:ring-0 w-full"
                    value={item.price}
                    onChange={(e) => handleChange('price', parseFloat(e.target.value) || 0)}
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
