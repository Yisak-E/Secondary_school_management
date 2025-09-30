// features/director/components/ReportGenerator.jsx
import { useState } from 'react';

function ReportGenerator() {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [generatedReport, setGeneratedReport] = useState(null);

  const reportTemplates = [
    { id: 'attendance', name: 'Attendance Report', description: 'Daily and monthly attendance summaries' },
    { id: 'academic', name: 'Academic Performance', description: 'Grade distribution and subject performance' },
    { id: 'financial', name: 'Financial Summary', description: 'Fee collection and financial overview' },
    { id: 'enrollment', name: 'Enrollment Statistics', description: 'Student enrollment trends and demographics' }
  ];

  const handleGenerateReport = () => {
    const mockReport = {
      id: Date.now(),
      type: reportType,
      dateRange,
      generatedAt: new Date().toLocaleString(),
      data: `Mock ${reportTemplates.find(r => r.id === reportType)?.name} data for ${dateRange.start} to ${dateRange.end}`
    };

    setGeneratedReport(mockReport);
  };

  const handleExportReport = (format) => {
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Generator</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {reportTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              {reportTemplates.find(t => t.id === reportType)?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            disabled={!dateRange.start || !dateRange.end}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Generate Report
          </button>
        </div>

        {generatedReport && (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {reportTemplates.find(r => r.id === generatedReport.type)?.name}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExportReport('pdf')}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Export PDF
                </button>
                <button
                  onClick={() => handleExportReport('excel')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Export Excel
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1 mb-4">
              <div>Period: {generatedReport.dateRange.start} to {generatedReport.dateRange.end}</div>
              <div>Generated: {generatedReport.generatedAt}</div>
            </div>

            <div className="bg-white p-4 rounded border">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{generatedReport.data}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportGenerator;