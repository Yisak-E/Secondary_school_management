// src/components/PdfViewer.jsx
import { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// PDF.js worker setup for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

function PdfViewer({ fileUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (fileUrl) {
      loadPdf();
    }
  }, [fileUrl, pageNumber]);

  async function loadPdf() {
    if (!fileUrl) return;

    setLoading(true);
    try {
      const pdf = await pdfjsLib.getDocument(fileUrl).promise;
      setNumPages(pdf.numPages);

      const page = await pdf.getPage(pageNumber);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading PDF:', error);
    } finally {
      setLoading(false);
    }
  }

  function goToPreviousPage() {
    setPageNumber(prev => Math.max(1, prev - 1));
  }

  function goToNextPage() {
    setPageNumber(prev => Math.min(numPages, prev + 1));
  }

  if (!fileUrl) {
    return <div className="pdf-error">Please provide a PDF file URL</div>;
  }

  return (
    <div className="container w-full">
      {loading && (
        <div className="pdf-loading">Loading PDF...</div>
      )}

      <div className="pdf-canvas-container">
        <canvas ref={canvasRef} className="pdf-canvas" />
      </div>

      {numPages && (
        <div className="pdf-controls">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1 || loading}
            className="pdf-button"
          >
            Previous
          </button>

          <span className="pdf-page-info">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages || loading}
            className="pdf-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;