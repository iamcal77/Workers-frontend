import React from 'react';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaRegFilePdf } from 'react-icons/fa';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';

function ActionBar({
  onAdd,
  onDelete,
  onEdit,
  showBackButton,
  showAddButton = true,
  showEditButton = true,
  showDeleteButton = true,
  showExportToExcel = true,
  showExportToPDF = true,
  exportPage // New prop for page export functionality
}) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Goes back to the previous page
  };

  // Export the entire page to PDF
  const exportPageToPDF = () => {
    const element = document.body; // Capture the entire page

    // Styling the PDF export to keep the layout intact
    const options = {
      margin:       [18, 15, 15, 18], // Margin for the PDF
      filename:     'page.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { dpi: 192, letterRendering: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }

    };

    html2pdf()
      .from(element)
      .set(options)
      .save();
  };

  // Export the entire page to Excel
  const exportPageToExcel = () => {
    const element = document.body; // Capture the entire page
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // You can define a worksheet for the main content, here we use the entire body
    const ws = XLSX.utils.table_to_sheet(element);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Page Content');

    // Write the file to the user's computer
    XLSX.writeFile(wb, "page-export.xlsx");
  };

  return (
    <div className="flex justify-between mb-1 items-center p-4 bg-transparent fixed top-12 left-64 w-[calc(100%-16rem)] z-20">
      {/* Action buttons */}
      <div className="ml-auto space-x-4 flex">
        {showAddButton && (
          <button onClick={onAdd} className="text-green-500 px-4 py-2 rounded-lg flex items-center space-x-2">
            <FaPlus className="text-lg" />
            <span>Add</span>
          </button>
        )}

        {showEditButton && (
          <button onClick={onEdit} className="text-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2">
            <FaEdit className="text-lg" />
            <span>Edit</span>
          </button>
        )}

        {showDeleteButton && (
          <button onClick={onDelete} className="text-red-500 px-4 py-2 rounded-lg flex items-center space-x-2">
            <FaTrash className="text-lg" />
            <span>Delete</span>
          </button>
        )}

        {/* Export buttons */}
        {showExportToExcel && (
          <button onClick={exportPageToExcel} className="text-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2">
            <RiFileExcel2Fill className="text-lg" />
            <span>Export to Excel</span>
          </button>
        )}

        {showExportToPDF && (
          <button onClick={exportPageToPDF} className="text-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2">
            <FaRegFilePdf className="text-lg" />
            <span>Export to PDF</span>
          </button>
        )}

        {showBackButton && (
          <button onClick={handleBackClick} className="text-blue-500 px-4 py-2 rounded-lg flex items-center space-x-2">
            <FaArrowLeft className="text-lg" />
            <span>Back</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ActionBar;
