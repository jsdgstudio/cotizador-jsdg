import React from 'react';
import QuotationItem from './QuotationItem';
import { Plus } from 'lucide-react';

const QuotationTable = ({ items, onUpdateItem, onRemoveItem, onAddItem, subtotal, iva, total }) => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-8">
            {/* Table Header */}
            <div className="rounded-t-3xl overflow-hidden border-2" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <div className="grid grid-cols-12 bg-black text-white font-bold text-center py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                    <div className="col-span-1">Nº</div>
                    <div className="col-span-6 text-left pl-4">Servicio / Descripción</div>
                    <div className="col-span-2">Tiempo Estimado</div>
                    <div className="col-span-3">Precio</div>
                </div>

                {/* Items */}
                <div className="backdrop-blur-sm" style={{ backgroundColor: 'rgba(229,231,235,0.9)' }}>
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
                <div className="border-t" style={{ backgroundColor: 'rgba(229,231,235,0.9)', borderColor: 'rgba(255,255,255,0.5)' }}>
                    {/* Subtotal Row */}
                    <div className="grid grid-cols-12 border-b" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
                        <div className="col-span-7" style={{ backgroundColor: 'rgba(156,163,175,0.5)' }}></div> {/* Spacer/Grey block */}
                        <div className="col-span-5 flex items-center justify-between px-6 py-4 font-bold text-gray-700">
                            <div className="flex items-center gap-2">
                                <span className="text-xl">SubTotal:</span>
                                <span className="text-2xl">${subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                + IVA 19% : ${iva.toLocaleString('es-CL')} CLP
                            </div>
                        </div>
                    </div>

                    {/* Total Row */}
                    <div className="grid grid-cols-12">
                        <div className="col-span-7 rounded-bl-3xl p-4 flex items-center" style={{ backgroundColor: 'rgba(107,114,128,0.5)' }}>
                            <button
                                onClick={onAddItem}
                                className="flex items-center gap-2 text-white hover:bg-black/70 px-4 py-2 rounded-full transition-colors text-sm font-bold ml-4"
                                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                            >
                                <Plus size={16} /> Agregar Item
                            </button>
                        </div>
                        <div className="col-span-5 rounded-br-3xl flex flex-col items-end justify-center px-6 py-6" style={{ backgroundColor: 'rgba(209,213,219,0.5)' }}>
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
