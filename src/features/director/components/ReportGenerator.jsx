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
    // Simulate report generation
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
    // Implementation for PDF/Excel export would go here
  };

  return (
    <div className="report-generator">
      <h2>Report Generator</h2>
      
      <div className="report-controls">
        <div className="form-group">
          <label>Report Type</label>
          <select 
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="form-select"
          >
            {reportTemplates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <small className="form-text">
            {reportTemplates.find(t => t.id === reportType)?.description}
          </small>
        </div>

        <div className="date-range">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="form-input"
            />
          </div>
        </div>

        <button 
          onClick={handleGenerateReport}
          disabled={!dateRange.start || !dateRange.end}
          className="btn btn-primary"
        >
          Generate Report
        </button>
      </div>

      {generatedReport && (
        <div className="generated-report">
          <div className="report-header">
            <h3>
              {reportTemplates.find(r => r.id === generatedReport.type)?.name}
            </h3>
            <div className="report-actions">
              <button 
                onClick={() => handleExportReport('pdf')}
                className="btn btn-outline"
              >
                Export PDF
              </button>
              <button 
                onClick={() => handleExportReport('excel')}
                className="btn btn-outline"
              >
                Export Excel
              </button>
            </div>
          </div>
          
          <div className="report-meta">
            <span>Period: {generatedReport.dateRange.start} to {generatedReport.dateRange.end}</span>
            <span>Generated: {generatedReport.generatedAt}</span>
          </div>
          
          <div className="report-content">
            <pre>{generatedReport.data}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReportGenerator;