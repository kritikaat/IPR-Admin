import * as XLSX from 'xlsx';
import { Parser } from 'json2csv';

// Function to export data as Excel
export const exportToExcel = (data, filename) => {
  const worksheet = XLSX.utils.json_to_sheet(data); // Convert JSON data to a worksheet
  const workbook = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); // Append worksheet to workbook
  XLSX.writeFile(workbook, `${filename}.xlsx`); // Write and download the file as .xlsx
};

// Function to export data as CSV
export const exportToCSV = (data, filename) => {
  const json2csvParser = new Parser(); // Initialize CSV parser
  const csv = json2csvParser.parse(data); // Convert JSON data to CSV format
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); // Create a Blob with CSV data
  const link = document.createElement('a'); // Create a download link
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', `${filename}.csv`); // Set filename for download
  document.body.appendChild(link);
  link.click(); // Trigger download
  document.body.removeChild(link); // Clean up the DOM
};
