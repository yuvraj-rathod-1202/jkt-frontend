import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import BillTop from "./BillTop";

const Bill = () => {
  const printRef = useRef();

  const handleSave = () => {
    // Define the options for html2pdf
    const options = {
      margin:       10,
      filename:     "invoice.pdf", // Ensure the file is saved as a PDF
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    // Use html2pdf to generate the PDF and save it
    html2pdf()
      .from(printRef.current)
      .set(options)
      .save(); // Save the PDF file
  };

  const handlePrint = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=600");

    // Wait until the PDF is generated and then open the print dialog
    handleSave();

    setTimeout(() => {
      const content = printRef.current.innerHTML; // Get the content to print

      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .bg-gray-50 { background-color: #f9fafb; }
              .border-solid { border-style: solid; }
              .border-black { border-color: black; }
              .border-2 { border-width: 2px; }
              .grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr); /* 5 equal columns */
                gap: 10px;
                align-items: center;
              }
              .col-span-2 { grid-column: span 2; }
              .col-span-1 { grid-column: span 1; }
              .p-4 { padding: 16px; }
              .text-center { text-align: center; }
              .font-semibold { font-weight: 600; }
              .text-sm { font-size: 14px; }
              .mt-1 { margin-top: 8px; }
              .font-bold { font-weight: bold; }
              .text-xl { font-size: 24px; }
            </style>
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print(); // Open the print dialog
    }, 1000); // Add delay for the PDF to be generated first
  };

  const [billType, setBillType] = useState();


  const handleChange = (e) => {
    setBillType(e.target.value);
  }
  return (

    

    <div>
      <div className="content-center text-center mb-4 border-solid border-2 w-12">
        <select onChange={handleChange}>
          <option>રાસાયણિક ખાતર</option>
          <option>d</option>
          <option>j</option>
        </select>
      </div>
    <div className="border-solid border-2 max-w-4xl border-black content-center text-center">
     <BillTop />
    </div>
    </div>
  );
};

export default Bill;
