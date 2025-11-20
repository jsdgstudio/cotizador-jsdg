import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import QuotationTable from './components/QuotationTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

function App() {
  const [projectTitle, setProjectTitle] = useState('Desarrollo Web Clínica Synaptech');
  const [date, setDate] = useState('03 - 07 - 2025');

  const [items, setItems] = useState([
    { id: 1, service: 'Reunión inicial', description: 'Levantamiento de información, objetivos del sitio, definición de requerimientos y contenido.', time: '1-2 días', price: 0 },
    { id: 2, service: 'Wireframes', description: 'Estructura inicial del sitio para validar distribución de contenido y navegación.', time: '2-3 días', price: 30000 },
    { id: 3, service: 'Diseño Visual', description: 'Diseño de las páginas principales', time: '10 días', price: 100000 },
    { id: 4, service: 'Hosting y Dominio', description: 'Configuración de hosting | compra del dominio .cl | Gestion de cuentas y licencias', time: '1-2 días', price: 80000 },
    { id: 5, service: 'Desarrollo Técnico', description: 'Configuración de WordPress, instalación de Divi, construcción de páginas y funcionalidades.', time: '5-7 días', price: 160000 },
    { id: 6, service: 'Revisión y Ajustes', description: 'Correcciones finales, pruebas de funcionalidad, optimización de velocidad y responsividad.', time: '2-3 días', price: 20000 },
    { id: 7, service: 'Capacitación y Mantenimiento', description: 'Video tutorial gestion de contenido básico en Wordpress | Servicio Técnico tarifa x 2 meses', time: '-', price: 30000 },
  ]);

  const contentRef = useRef(null);

  const handleAddItem = () => {
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: newId, service: '', description: '', time: '', price: 0 }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const iva = Math.round(subtotal * 0.19); // Using 19% as standard, reference says 14.5%? Reference says "IVA 14.5% : $60.900". 420000 * 0.145 = 60900. So it is 14.5%.
  // Wait, Chile IVA is 19%. Maybe it's a specific case or retention. I will use 14.5% to match reference exactly or make it editable?
  // The user said "manten el diseño de la referencia". I'll stick to 14.5% if that matches the math, but usually it's 19%.
  // Let's check the math in the image: 420.000 * 0.145 = 60.900. Yes, it is exactly 14.5%.
  // I will use 0.145 but maybe add a comment or make it configurable if I had more time. For now, hardcode to match reference.
  const ivaRate = 0.145;
  const ivaAmount = Math.round(subtotal * ivaRate);
  const total = subtotal + ivaAmount;

  const handleExportPDF = async () => {
    const element = contentRef.current;

    try {
      const canvas = await html2canvas(element, {
        scale: 3, // Good balance of quality and file size
        backgroundColor: '#1a1a1a',
        useCORS: false,
        allowTaint: true,
        logging: false,
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('printable-content');
          if (clonedElement) {
            // Set width to approx A4 width at 96dpi (794px) minus margins, 
            // or slightly larger to scale down for better quality.
            // 1000px is a good target for "desktop" look on A4.
            clonedElement.style.width = '1000px';
            clonedElement.style.minHeight = 'none';
            clonedElement.style.height = 'auto';
            clonedElement.style.maxWidth = 'none';
            clonedElement.style.margin = '0 auto';
            clonedElement.style.padding = '40px';
            clonedElement.style.overflow = 'visible'; // Ensure nothing is clipped

            // Force text wrapping
            const allText = clonedElement.querySelectorAll('*');
            allText.forEach(el => {
              el.style.whiteSpace = 'normal';
              el.style.wordWrap = 'break-word';
            });
          }
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pageWidth / imgWidth;
      const finalHeight = imgHeight * ratio;

      pdf.setFillColor(26, 26, 26);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');

      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, finalHeight);
      pdf.save('cotizacion_jsdg.pdf');
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert(`Error al generar PDF: ${error.message || error}`);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans p-4 md:p-8">
      {/* Controls */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors flex items-center gap-2"
          title="Descargar PDF"
        >
          <Download size={24} />
        </button>
      </div>

      {/* Printable Area */}
      <div ref={contentRef} id="printable-content" className="max-w-5xl mx-auto bg-dark p-8 min-h-screen">
        <Header />

        <div className="mt-12 mb-8 border-b border-gray-700 pb-2 flex justify-between items-end">
          <input
            className="text-xl md:text-2xl font-bold bg-transparent border-none focus:ring-0 text-white w-full"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <input
            className="text-right text-gray-400 bg-transparent border-none focus:ring-0"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <QuotationTable
          items={items}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onUpdateItem={handleUpdateItem}
          subtotal={subtotal}
          iva={ivaAmount}
          total={total}
        />

        <Footer subtotal={subtotal} iva={ivaAmount} total={total} />
      </div>
    </div>
  );
}

export default App;
