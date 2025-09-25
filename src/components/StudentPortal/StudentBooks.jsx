import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/default-layout/lib/styles.css';





 function StudentBooks({user}){
    console.log(user)
     const listOfBooks = [
         {
             grade: 9,
             subject: 'Mathmatics',
             path: 'src/assets/books/Math9.pdf',
         }
     ]
    return (
        <>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
              <Viewer fileUrl={listOfBooks[0].path} />
            </Worker>
        </>
    )
}

export default StudentBooks