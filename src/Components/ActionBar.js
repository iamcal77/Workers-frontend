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
  exportPage, // New prop for page export functionality
  dataGridId // ID for the DataGrid element for export
}) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Goes back to the previous page
  };

  const exportPageToPDF = () => {
    const element = document.getElementById('page-content'); 
    if (!element) {
      console.error('Element not found');
      return;
    }
  
    // Capture the page title dynamically
    const pageTitle = document.title || 'exported-page'; 
  
    // Define custom styles for the PDF content
    const styles = `
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
        font-size: 14px;
        color: #333;
      }
      th, td {
        padding: 12px;
        text-align: left;
        border: 1px solid #ddd;
      }
      th {
        background-color: #007BFF;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
      }
      td {
        background-color: #f9f9f9;
        font-size: 14px;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #e0e0e0;
      }
      h1 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        color: #333;
      }
      .content-wrapper {
        margin: 20px;
      }
    `;
  
    // Create a <style> tag and append it to the head
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
  
    const options = {
      margin: [20, 15, 15, 15],
      filename: `${pageTitle}.pdf`, // Use the page title for the filename
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    // Capture and export the page to PDF
    html2pdf()
      .from(element)
      .set(options)
      .save()
      .catch((err) => {
        console.error('Error exporting to PDF:', err);
      })
      .finally(() => {
        // Clean up the temporary style tag
        document.head.removeChild(styleTag);
      });
  };
  
  
  
  
  const exportPageToExcel = () => {
    const element = document.getElementById('page-content'); // Capture the entire page
    if (!element) {
      console.error('Element not found');
      return;
    }
  
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(element);
  
    XLSX.utils.book_append_sheet(wb, ws, 'Page Content');
    XLSX.writeFile(wb, 'page-export.xlsx');
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
