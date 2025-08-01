import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';
import Navigation from './Navigation';
import TableTemplates from './TableTemplates';
import ColumnConfig from './ColumnConfig';
import SQLResult from './SQLResult';
import LoadingSpinner from './LoadingSpinner';
import { Toaster } from 'react-hot-toast';
import SQLGenerator from '../utils/sqlGenerators';
import { FaDatabase, FaCog, FaPlay, FaHistory } from 'react-icons/fa';

const ModernApp = () => {
  const { isDarkMode } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tableName, setTableName] = useState('table1');
  const [rowCount, setRowCount] = useState(25);
  const [columns, setColumns] = useState([]);
  const [databaseType, setDatabaseType] = useState('mysql');
  const [isGenerating, setIsGenerating] = useState(false);
  const [sqlScript, setSqlScript] = useState({});
  const [activeSection, setActiveSection] = useState('generator');
  const [history, setHistory] = useState([]);

  const databaseTypes = [
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'sqlserver', label: 'SQL Server' },
    { value: 'sqlite', label: 'SQLite' }
  ];

  useEffect(() => {
    // Check for existing login
    const savedLogin = localStorage.getItem('sqlGeneratorLogin');
    if (savedLogin) {
      const loginData = JSON.parse(savedLogin);
      setIsLoggedIn(true);
      setIsAdmin(loginData.isAdmin);
    }
  }, []);

  const handleLogin = (username) => {
    const isAdminUser = username === 'admin';
    const loginData = { username, isAdmin: isAdminUser };
    localStorage.setItem('sqlGeneratorLogin', JSON.stringify(loginData));
    setIsLoggedIn(true);
    setIsAdmin(isAdminUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('sqlGeneratorLogin');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleColumnAdd = (column) => {
    setColumns(prev => [...prev, column]);
  };

  const handleColumnRemove = (index) => {
    setColumns(prev => prev.filter((_, i) => i !== index));
  };

  const handleTemplateSelect = (template) => {
    setTableName(template.id);
    setColumns(template.columns.map(col => ({
      colNameValue: col.name,
      selectedOption: col.type,
      radio: col.isPrimary ? 'PK' : '',
      selectedDataOption: col.dataType || '',
      intRangeState: false
    })));
  };

  const generateSQL = async () => {
    if (columns.length === 0) {
      toast.error('Please add at least one column');
      return;
    }

    setIsGenerating(true);
    
    try {
      const generator = new SQLGenerator(databaseType);
      
      const createScript = generator.generateCreateTable(tableName, columns);
      const insertScript = generator.generateInsert(tableName, columns, rowCount);
      const procedureScript = generator.generateStoredProcedure(tableName, columns);
      const migrationScript = generator.generateMigration(tableName, columns);

      const newSqlScript = {
        create: createScript,
        insert: insertScript,
        procedure: procedureScript,
        migration: migrationScript
      };

      setSqlScript(newSqlScript);

      // Add to history
      const historyItem = {
        id: Date.now(),
        tableName,
        databaseType,
        columnCount: columns.length,
        rowCount,
        timestamp: new Date().toISOString()
      };
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]); // Keep last 10

      toast.success('SQL generated successfully!');
    } catch (error) {
      console.error('Error generating SQL:', error);
      toast.error('Error generating SQL. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTableNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
    setTableName(value);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <Toaster position="top-right" />
      
      <Navigation onLogout={handleLogout} />
      
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card">
              <div className="card-header">
                <h6 className="mb-0">
                  <FaCog className="me-2" />
                  Configuration
                </h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Table Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tableName}
                    onChange={handleTableNameChange}
                    placeholder="Enter table name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Row Count</label>
                  <input
                    type="range"
                    className="form-range"
                    min="1"
                    max={isAdmin ? 1000 : 100}
                    value={rowCount}
                    onChange={(e) => setRowCount(parseInt(e.target.value))}
                  />
                  <div className="text-center">
                    <span className="badge bg-primary">{rowCount} rows</span>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Database Type</label>
                  <select
                    className="form-select"
                    value={databaseType}
                    onChange={(e) => setDatabaseType(e.target.value)}
                  >
                    {databaseTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary w-100"
                  onClick={generateSQL}
                  disabled={isGenerating || columns.length === 0}
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FaPlay className="me-2" />
                      Generate SQL
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <div className="row">
              <div className="col-12">
                <ul className="nav nav-tabs mb-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeSection === 'generator' ? 'active' : ''}`}
                      onClick={() => setActiveSection('generator')}
                    >
                      <FaDatabase className="me-1" />
                      Generator
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeSection === 'templates' ? 'active' : ''}`}
                      onClick={() => setActiveSection('templates')}
                    >
                      <FaCog className="me-1" />
                      Templates
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeSection === 'history' ? 'active' : ''}`}
                      onClick={() => setActiveSection('history')}
                    >
                      <FaHistory className="me-1" />
                      History
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {activeSection === 'generator' && (
              <div className="row">
                <div className="col-md-6">
                  <ColumnConfig
                    onColumnAdd={handleColumnAdd}
                    onColumnRemove={handleColumnRemove}
                    columns={columns}
                  />
                </div>
                <div className="col-md-6">
                  {Object.keys(sqlScript).length > 0 && (
                    <SQLResult
                      sqlScript={sqlScript}
                      tableName={tableName}
                      databaseType={databaseType}
                    />
                  )}
                </div>
              </div>
            )}

            {activeSection === 'templates' && (
              <TableTemplates onTemplateSelect={handleTemplateSelect} />
            )}

            {activeSection === 'history' && (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h6 className="mb-0">
                        <FaHistory className="me-2" />
                        Generation History
                      </h6>
                    </div>
                    <div className="card-body">
                      {history.length === 0 ? (
                        <p className="text-muted text-center">No history yet</p>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Table Name</th>
                                <th>Database</th>
                                <th>Columns</th>
                                <th>Rows</th>
                                <th>Generated</th>
                              </tr>
                            </thead>
                            <tbody>
                              {history.map((item) => (
                                <tr key={item.id}>
                                  <td><code>{item.tableName}</code></td>
                                  <td>
                                    <span className="badge bg-secondary">
                                      {item.databaseType.toUpperCase()}
                                    </span>
                                  </td>
                                  <td>{item.columnCount}</td>
                                  <td>{item.rowCount}</td>
                                  <td>
                                    {new Date(item.timestamp).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const { isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className={`login-screen ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-header text-center">
                <h4 className="mb-0">
                  <FaDatabase className="me-2" />
                  SQL Data Generator
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <small className="text-muted">
                    Use 'admin' for admin access, any other username for user access
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernApp;