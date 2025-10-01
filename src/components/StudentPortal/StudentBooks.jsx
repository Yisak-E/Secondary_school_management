// components/StudentPortal/StudentBooks.jsx
import { useState, useEffect } from 'react';

export default function StudentBooks({ user }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockBooks = [
    {
      id: 1,
      title: 'Mathematics Textbook',
      author: 'John Smith',
      subject: 'Mathematics',
      isbn: '978-1234567890',
      issuedDate: '2024-01-15',
      dueDate: '2024-06-15',
      status: 'issued',
      coverColor: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'English Literature',
      author: 'Sarah Johnson',
      subject: 'English',
      isbn: '978-0987654321',
      issuedDate: '2024-01-15',
      dueDate: '2024-06-15',
      status: 'issued',
      coverColor: 'bg-red-500'
    },
    {
      id: 3,
      title: 'Physics Fundamentals',
      author: 'Dr. Robert Brown',
      subject: 'Science',
      isbn: '978-1122334455',
      status: 'available',
      coverColor: 'bg-green-500'
    },
    {
      id: 4,
      title: 'World History',
      author: 'Prof. Emily Davis',
      subject: 'History',
      isbn: '978-5566778899',
      status: 'available',
      coverColor: 'bg-yellow-500'
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBooks(mockBooks);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      issued: { color: 'bg-green-100 text-green-800', text: 'Issued' },
      available: { color: 'bg-blue-100 text-blue-800', text: 'Available' },
      overdue: { color: 'bg-red-100 text-red-800', text: 'Overdue' },
    };
    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  const issuedBooks = books.filter(book => book.status === 'issued');
  const availableBooks = books.filter(book => book.status === 'available');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Library Books</h1>
          <p className="text-gray-600">Manage your textbooks and library resources</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Books</p>
                <p className="text-2xl font-bold text-gray-800">{books.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Issued Books</p>
                <p className="text-2xl font-bold text-gray-800">{issuedBooks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg">
                <span className="text-gray-600 text-2xl">📖</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-800">{availableBooks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Issued Books */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Currently Issued Books</h2>
          {issuedBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {issuedBooks.map((book) => (
                <div key={book.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className={`h-2 ${book.coverColor} rounded-t-lg -mx-4 -mt-4 mb-3`}></div>
                  <h3 className="font-bold text-gray-800 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">By {book.author}</p>
                  <p className="text-sm text-gray-500 mb-3">Subject: {book.subject}</p>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">Issued: {book.issuedDate}</p>
                    <p className="text-gray-600">Due: {book.dueDate}</p>
                  </div>
                  <div className="mt-3">
                    {getStatusBadge(book.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No books currently issued</p>
          )}
        </div>

        {/* Available Books */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Available Books</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISBN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {availableBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {book.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {book.isbn}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(book.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}