import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy, FaDownload, FaCode, FaDatabase, FaFileCode, FaHistory } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SQLResult = ({ sqlScript, tableName, databaseType = 'mysql' }) => {
  const [activeTab, setActiveTab] = useState('insert');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'insert', label: 'INSERT', icon: <FaDatabase /> },
    { id: 'create', label: 'CREATE', icon: <FaCode /> },
    { id: 'procedure', label: 'PROCEDURE', icon: <FaFileCode /> },
    { id: 'migration', label: 'MIGRATION', icon: <FaHistory /> }
  ];

  const handleCopy = () => {
    setCopied(true);
    toast.success('SQL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded successfully!');
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'insert':
        return sqlScript.insert || 'No INSERT script generated';
      case 'create':
        return sqlScript.create || 'No CREATE script generated';
      case 'procedure':
        return sqlScript.procedure || 'No stored procedure generated';
      case 'migration':
        return sqlScript.migration || 'No migration script generated';
      default:
        return sqlScript.insert || 'No SQL generated';
    }
  };

  const getFilename = () => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    return `${tableName}_${activeTab}_${timestamp}.sql`;
  };

  return (
    <div className="sql-result">
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <FaDatabase className="me-2" />
              Generated SQL
            </h5>
            <div className="btn-group" role="group">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span className="ms-1">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-secondary me-2">{databaseType.toUpperCase()}</span>
                <span className="text-muted">Table: {tableName}</span>
              </div>
              <div className="btn-group">
                <CopyToClipboard text={getTabContent()} onCopy={handleCopy}>
                  <button 
                    className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-secondary'}`}
                    title="Copy to clipboard"
                  >
                    <FaCopy className="me-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </CopyToClipboard>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => handleDownload(getTabContent(), getFilename())}
                  title="Download SQL file"
                >
                  <FaDownload className="me-1" />
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="sql-code-container">
            <SyntaxHighlighter
              language="sql"
              style={tomorrow}
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                maxHeight: '500px',
                overflow: 'auto'
              }}
              showLineNumbers={true}
              wrapLines={true}
            >
              {getTabContent()}
            </SyntaxHighlighter>
          </div>

          {/* SQL Statistics */}
          <div className="mt-3">
            <div className="row text-center">
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body py-2">
                    <small className="text-muted">Lines of Code</small>
                    <div className="fw-bold">{getTabContent().split('\n').length}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body py-2">
                    <small className="text-muted">Characters</small>
                    <div className="fw-bold">{getTabContent().length}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body py-2">
                    <small className="text-muted">Database</small>
                    <div className="fw-bold">{databaseType.toUpperCase()}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-light">
                  <div className="card-body py-2">
                    <small className="text-muted">Generated</small>
                    <div className="fw-bold">{new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLResult;