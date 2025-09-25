// components/PdfViewer.jsx
import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfViewer = ({ fileUrl }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(fileUrl);
    loadingTask.promise.then(pdf => {
      pdf.getPage(1).then(page => {
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        page.render({ canvasContext: context, viewport });
      });
    });
  }, [fileUrl]);

  return <canvas ref={canvasRef} />;
};

export default PdfViewer;