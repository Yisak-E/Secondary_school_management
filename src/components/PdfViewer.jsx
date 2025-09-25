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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const pdfDocRef = useRef(null);

  useEffect(() => {
    if (fileUrl) {
      loadPdf();
    }

    // Cleanup function
    return () => {
      // Cancel any ongoing render when component unmounts
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
      // Clean up PDF document
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
        pdfDocRef.current = null;
      }
    };
  }, [fileUrl]);

  useEffect(() => {
    if (pdfDocRef.current && pageNumber) {
      renderPage(pageNumber);
    }
  }, [pageNumber]);

  async function loadPdf() {
    if (!fileUrl) return;

    setLoading(true);
    setError(null);

    try {
      // Clean up previous PDF document
      if (pdfDocRef.current) {
        pdfDocRef.current.destroy();
      }

      const pdf = await pdfjsLib.getDocument({
        url: fileUrl,
        // Enable CORS for external URLs
        cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
        cMapPacked: true,
      }).promise;

      pdfDocRef.current = pdf;
      setNumPages(pdf.numPages);

      // Render the first page
      await renderPage(1);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setError(`Failed to load PDF: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function renderPage(pageNum) {
    if (!pdfDocRef.current || !canvasRef.current) return;

    try {
      setLoading(true);

      const page = await pdfDocRef.current.getPage(pageNum);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Calculate scale to fit container
      const containerWidth = canvas.parentElement.clientWidth - 40; // Account for padding
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(containerWidth / viewport.width, 1.5);
      const scaledViewport = page.getViewport({ scale });

      // Set canvas dimensions
      canvas.height = scaledViewport.height;
      canvas.width = scaledViewport.width;

      // Cancel previous render if still running
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }

      const renderContext = {
        canvasContext: context,
        viewport: scaledViewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;

      await renderTask.promise;
    } catch (error) {
      // Ignore cancellation errors
      if (error.name !== 'RenderingCancelledException') {
        console.error('Error rendering PDF page:', error);
        setError(`Failed to render page: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(prev => prev - 1);
    }
  }

  function goToNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(prev => prev + 1);
    }
  }

  // Handle window resize for responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (pdfDocRef.current) {
        renderPage(pageNumber);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageNumber]);

  if (!fileUrl) {
    return (
      <div className="pdf-error p-4 text-red-600 bg-red-100 rounded">
        Please provide a PDF file URL
      </div>
    );
  }

  return (
    <div className="pdf-viewer w-full max-w-4xl mx-auto p-4">
      {error && (
        <div className="pdf-error mb-4 p-4 text-red-600 bg-red-100 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="pdf-loading mb-4 p-4 text-blue-600 bg-blue-100 rounded text-center">
          Loading PDF...
        </div>
      )}

      <div className="pdf-canvas-container bg-gray-50 rounded-lg p-4 mb-4 flex justify-center">
        <canvas
          ref={canvasRef}
          className="pdf-canvas max-w-full border border-gray-300"
        />
      </div>

      {numPages && (
        <div className="pdf-controls flex items-center justify-center gap-4">
          <button
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1 || loading}
            className="pdf-button px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Previous
          </button>

          <span className="pdf-page-info text-gray-700 font-medium">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={pageNumber >= numPages || loading}
            className="pdf-button px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;