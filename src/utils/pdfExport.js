import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export a DOM element to PDF
 * @param {HTMLElement} element - The DOM element to export
 * @param {string} filename - The PDF filename (without .pdf)
 * @param {string} title - Optional title for the PDF
 */
export const exportToPDF = async (element, filename, title = '') => {
  try {
    if (!element) {
      alert('Element not found for PDF export');
      return;
    }

    // Show loading indicator
    const originalDisplay = element.style.display;
    
    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let heightLeft = imgHeight;
    let position = 0;

    // Add title if provided
    if (title) {
      pdf.setFontSize(16);
      pdf.text(title, pageWidth / 2, 15, { align: 'center' });
      position = 25;
      heightLeft -= 25;
    }

    // Add image and handle multiple pages
    const imgData = canvas.toDataURL('image/png');
    while (heightLeft > 0) {
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
      position = heightLeft > 0 ? -pageHeight : 0;
      if (heightLeft > 0) {
        pdf.addPage();
      }
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF export error:', error);
    alert('Error exporting to PDF: ' + error.message);
  }
};

/**
 * Export current view with a delay to ensure rendering
 */
export const exportCurrentViewToPDF = async (elementId, filename, title = '') => {
  // Add small delay to ensure rendering is complete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const element = document.getElementById(elementId);
  if (!element) {
    alert(`Element with ID "${elementId}" not found`);
    return;
  }
  
  await exportToPDF(element, filename, title);
};
