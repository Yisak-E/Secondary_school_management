import PdfViewer from "../PdfViewer.jsx";
import math9 from '/books/Math9.pdf';





 function StudentBooks({user}){
    console.log(user)
     const listOfBooks = [
         {
             grade: 9,
             subject: 'Mathmatics',
             path: math9,
         }
     ]
    return (
        <>
           <PdfViewer fileUrl={listOfBooks[0].path} />
        </>
    )
}

export default StudentBooks