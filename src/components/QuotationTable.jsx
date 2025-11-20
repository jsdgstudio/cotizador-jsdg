import React from 'react';
import QuotationItem from './QuotationItem';
import { Plus } from 'lucide-react';

const QuotationTable = ({ items, onUpdateItem, onRemoveItem, onAddItem, subtotal, iva, total }) => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-8">
            {/* Table Header */}
            <div className="rounded-t-3xl overflow-hidden border-2 border-white">
                <div className="grid grid-cols-12 bg-black text-white font-bold text-center py-6 border-b-2 border-white">
                    <div className="col-span-1 flex items-center justify-center">Nº</div>
                    <div className="col-span-6 text-left pl-4 flex items-center">Servicio / Descripción</div>
                    <div className="col-span-2 flex items-center justify-center">Tiempo Estimado</div>
                    <div className="col-span-3 flex items-center justify-center">Precio</div>
                </div>

                {/* Items */}
                <div className="bg-gray-200">
                    {items.map((item, index) => (
                        <QuotationItem
                            key={item.id}
                            item={item}
                            index={index}
                            onChange={onUpdateItem}
                            onRemove={onRemoveItem}
                        />
                    ))}
                </div>

                {/* Totals Section */}
                <div className="bg-gray-400 border-t-2 border-white">
                    {/* Subtotal Row */}
                    <div className="grid grid-cols-12 border-b-2 border-white">
                        <div className="col-span-7 bg-gray-400"></div> {/* Spacer */}
                        <div className="col-span-5 flex items-center justify-between px-6 py-4 font-bold text-gray-800 bg-gray-300">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">SubTotal:</span>
                                <span className="text-2xl">${subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="text-xs text-gray-600 font-bold">
                                + IVA 14.5% : ${iva.toLocaleString('es-CL')} CLP
                            </div>
                        </div>
                    </div>

                    {/* Total Row */}
                    <div className="grid grid-cols-12">
                        <div className="col-span-7 bg-gray-400 rounded-bl-3xl p-4 flex items-center">
                            <button
                                onClick={onAddItem}
                                className="flex items-center gap-2 text-white bg-black/50 hover:bg-black/70 px-4 py-2 rounded-full transition-colors text-sm font-bold ml-4"
                            >
                                <Plus size={16} /> Agregar Item
                            </button>
                        </div>
                        <div className="col-span-5 bg-gray-400 rounded-br-3xl flex flex-col items-end justify-center px-6 py-6 border-l-2 border-white">
                            <div className="text-3xl font-black text-gray-800">
                                ${total.toLocaleString('es-CL')}
                            </div>
                            <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Total + IVA
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationTable;
