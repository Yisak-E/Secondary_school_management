import PdfViewer from "../PdfViewer.jsx";
import { useState } from 'react';
import ict9 from '/books/Ict9.pdf';
import math9 from '/books/Math9.pdf';

const listOfBooks = [
    {
        grade: 9,
        subject: 'ICT',
        path: ict9,
    },
    {
        grade: 9,
        subject: 'Maths',
        path: math9,
    }
];

function StudentBooks({ user }) {
    const [selectedBook, setSelectedBook] = useState(null);

    const handleClick = (bookIndex) => {
        setSelectedBook(listOfBooks[bookIndex]);
    };

    console.log(user);

    return (
        <div className="p-4">
            <h3 className="text-center text-2xl mb-6">List of Books</h3>


                     {/* Books List */}
            <div className="mb-6">
                <select
                    onChange={(e) => handleClick(e.target.value)}
                    className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 cursor-pointer transition-all"
                    defaultValue=""
                >
                    <option value="" disabled className="text-gray-400">Choose a book to read...</option>
                    {listOfBooks.map((book, i) => (
                        <option key={i} value={i} className="bg-white text-blue-900">
                            {book.subject} - Grade {book.grade}
                        </option>
                    ))}
                </select>
            </div>

            {/* PDF Viewer */}
            {selectedBook && (
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-xl font-semibold">
                            Viewing: {selectedBook.subject} - Grade {selectedBook.grade}
                        </h4>
                        <button
                            onClick={() => setSelectedBook(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Close PDF
                        </button>
                    </div>
                    <PdfViewer fileUrl={selectedBook.path} />
                </div>
            )}
        </div>
    );
}

export default StudentBooks;